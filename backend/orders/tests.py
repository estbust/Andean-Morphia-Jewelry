from decimal import Decimal
from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from catalog.models import Category, Product
from orders.models import Order, OrderItem


class OrderModelTests(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Anillos", slug="anillos")
        self.silver_product = Product.objects.create(
            category=self.category,
            name="Anillo en punta",
            slug="anillo-en-punta",
            metal_type="PLATA",
            price=Decimal("90.00"),
            stock=10
        )
        self.gold_product = Product.objects.create(
            category=self.category,
            name="Anillo Sol Oro",
            slug="anillo-sol-oro",
            metal_type="ORO",
            price=Decimal("350.00"),
            stock=5
        )
        self.order = Order.objects.create(
            order_number="AM-2026-TEST",
            customer_full_name="Luciana Vega",
            customer_email="luciana@example.com",
            customer_phone="+51984000111",
            shipping_address="Av. El Sol 450",
            city="Cusco",
            total_amount=Decimal("440.00")
        )

    def test_order_creation_and_str(self):
        self.assertIn("AM-2026-TEST", str(self.order))
        self.assertEqual(self.order.status, "PENDING")

    def test_order_item_packaging_assignment_silver(self):
        item = OrderItem.objects.create(
            order=self.order,
            product=self.silver_product,
            quantity=1,
            unit_price=self.silver_product.price
        )
        self.assertIn("Packaging Plata", item.packaging_assigned)
        self.assertIn("Estuche gamuza celeste", item.packaging_assigned)
        self.assertEqual(item.subtotal, Decimal("90.00"))

    def test_order_item_packaging_assignment_gold(self):
        item = OrderItem.objects.create(
            order=self.order,
            product=self.gold_product,
            quantity=2,
            unit_price=self.gold_product.price
        )
        self.assertIn("Packaging Oro", item.packaging_assigned)
        self.assertIn("Estuche especial", item.packaging_assigned)
        self.assertEqual(item.subtotal, Decimal("700.00"))


class OrderAPITests(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Anillos", slug="anillos")
        self.product1 = Product.objects.create(
            category=self.category,
            name="Anillo en punta",
            slug="anillo-en-punta",
            metal_type="PLATA",
            price=Decimal("90.00"),
            stock=5,
            is_active=True
        )
        self.product2 = Product.objects.create(
            category=self.category,
            name="Anillo corona",
            slug="anillo-corona",
            metal_type="PLATA",
            price=Decimal("130.00"),
            stock=4,
            is_active=True
        )

    def test_create_order_success(self):
        payload = {
            "customer_full_name": "Valeria Mendoza",
            "customer_email": "valeria@andeanmorphia.pe",
            "customer_phone": "+51987654321",
            "shipping_address": "Calle San Agustín 280",
            "city": "Cusco",
            "gift_note": "Para mi renovación interior",
            "payment_method": "YAPE_PLIN_TRANSFER",
            "items": [
                {"product_id": str(self.product1.id), "quantity": 2},
                {"product_id": self.product2.slug, "quantity": 1}
            ]
        }
        response = self.client.post('/api/v1/orders/create/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['order_number'].startswith('AM-2026-'))
        # 2 * 90 + 1 * 130 = 310.00
        self.assertEqual(Decimal(str(response.data['total_amount'])), Decimal('310.00'))
        self.assertEqual(response.data['formatted_total'], 'S/ 310.00')
        self.assertEqual(len(response.data['items']), 2)

        # Verify packaging assigned
        for item in response.data['items']:
            self.assertIn('Packaging Plata', item['packaging_assigned'])

        # Verify inventory deducted
        self.product1.refresh_from_db()
        self.product2.refresh_from_db()
        self.assertEqual(self.product1.stock, 3)  # 5 - 2
        self.assertEqual(self.product2.stock, 3)  # 4 - 1

    def test_create_order_root_api_alias(self):
        payload = {
            "customer_full_name": "Carlos Ramos",
            "customer_email": "carlos@example.com",
            "customer_phone": "+51999888777",
            "shipping_address": "Av. Larco 101",
            "city": "Lima",
            "items": [
                {"product_id": self.product1.slug, "quantity": 1}
            ]
        }
        response = self.client.post('/api/orders/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['order_number'].startswith('AM-2026-'))

    def test_create_order_insufficient_stock(self):
        payload = {
            "customer_full_name": "Mateo Silva",
            "customer_email": "mateo@example.com",
            "customer_phone": "+51988112233",
            "shipping_address": "Plaza de Armas 12",
            "city": "Arequipa",
            "items": [
                {"product_id": str(self.product1.id), "quantity": 10}  # stock is only 5
            ]
        }
        response = self.client.post('/api/v1/orders/create/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Stock insuficiente", response.data['error'])

        # Verify stock was NOT deducted
        self.product1.refresh_from_db()
        self.assertEqual(self.product1.stock, 5)

    def test_create_order_invalid_product(self):
        payload = {
            "customer_full_name": "Mateo Silva",
            "customer_email": "mateo@example.com",
            "customer_phone": "+51988112233",
            "shipping_address": "Plaza de Armas 12",
            "city": "Arequipa",
            "items": [
                {"product_id": "non-existent-product-id", "quantity": 1}
            ]
        }
        response = self.client.post('/api/v1/orders/create/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("no existe", response.data['error'])

    def test_retrieve_order_by_number(self):
        order = Order.objects.create(
            order_number="AM-2026-K9Z1",
            customer_full_name="Elena Quispe",
            customer_email="elena@example.com",
            customer_phone="+51984123456",
            shipping_address="San Blas 55",
            city="Cusco",
            total_amount=Decimal("90.00")
        )
        OrderItem.objects.create(
            order=order,
            product=self.product1,
            quantity=1,
            unit_price=self.product1.price
        )

        response = self.client.get('/api/orders/AM-2026-K9Z1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['customer_full_name'], "Elena Quispe")
        self.assertEqual(len(response.data['items']), 1)
