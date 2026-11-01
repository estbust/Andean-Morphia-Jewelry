from decimal import Decimal
from django.test import TestCase
from django.urls import reverse
from django.core.management import call_command
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Category, Product, ProductImage


class CatalogModelTests(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name="Anillos",
            slug="anillos",
            description="Anillos artesanales en Plata 950 y Oro elaborados en Cusco."
        )
        self.silver_product = Product.objects.create(
            category=self.category,
            name="Anillo en punta",
            slug="anillo-en-punta",
            metal_type="PLATA",
            price=Decimal("90.00"),
            short_description="Anillo semi triangular en punta.",
            symbolic_meaning="Dirección consciente y ascenso hacia las cumbres andinas.",
            technical_details="Plata 950 artesanal cusqueña.",
            image_path="/products/chevron-ring.png",
            stock=10,
            is_featured=True,
            is_active=True,
        )
        self.gold_product = Product.objects.create(
            category=self.category,
            name="Anillo Sol Inca",
            slug="anillo-sol-inca",
            metal_type="ORO",
            price=Decimal("450.00"),
            short_description="Anillo en Oro 18k.",
            symbolic_meaning="Poder solar y renovación trascendente.",
            technical_details="Oro 18k macizo.",
            image_path="/products/gold-sun.png",
            stock=3,
            is_featured=False,
            is_active=True,
        )

    def test_category_creation_and_str(self):
        self.assertEqual(str(self.category), "Anillos")
        self.assertEqual(self.category.slug, "anillos")

    def test_product_packaging_preview(self):
        self.assertIn("Packaging Plata", self.silver_product.packaging_preview)
        self.assertIn("Packaging Oro", self.gold_product.packaging_preview)

    def test_product_str(self):
        self.assertEqual(str(self.silver_product), "Anillo en punta (PLATA)")
        self.assertEqual(str(self.gold_product), "Anillo Sol Inca (ORO)")

    def test_product_image_creation(self):
        image = ProductImage.objects.create(
            product=self.silver_product,
            image_path="/products/chevron-ring.png",
            alt_text="Anillo en punta vista frontal",
            is_primary=True
        )
        self.assertEqual(str(image), "Image for Anillo en punta (/products/chevron-ring.png)")
        self.assertTrue(image.is_primary)


class CatalogAPITests(APITestCase):
    def setUp(self):
        call_command('seed_catalog')

    def test_categories_endpoint(self):
        response_api = self.client.get('/api/categories/')
        self.assertEqual(response_api.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response_api.data), 1)
        self.assertEqual(response_api.data[0]['slug'], 'anillos')
        self.assertEqual(response_api.data[0]['products_count'], 6)

        response_v1 = self.client.get('/api/v1/categories/')
        self.assertEqual(response_v1.status_code, status.HTTP_200_OK)

    def test_products_list_endpoint(self):
        response = self.client.get('/api/v1/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 6)

    def test_products_filter_by_category_slug(self):
        response = self.client.get('/api/v1/products/?category=anillos')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 6)

    def test_products_filter_by_metal(self):
        response_plata = self.client.get('/api/v1/products/?metal_type=PLATA')
        self.assertEqual(response_plata.status_code, status.HTTP_200_OK)
        results_plata = response_plata.data.get('results', response_plata.data)
        self.assertEqual(len(results_plata), 6)

        response_oro = self.client.get('/api/v1/products/?metal_type=ORO')
        self.assertEqual(response_oro.status_code, status.HTTP_200_OK)
        results_oro = response_oro.data.get('results', response_oro.data)
        self.assertEqual(len(results_oro), 0)

    def test_products_filter_by_featured(self):
        response = self.client.get('/api/v1/products/?featured=true')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 6)

    def test_products_search(self):
        response = self.client.get('/api/v1/products/?search=coral')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['slug'], 'anillo-con-piedra-coral')

    def test_product_detail_endpoint(self):
        response = self.client.get('/api/v1/products/anillo-en-punta/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Anillo en punta')
        self.assertEqual(response.data['metal_type'], 'PLATA')
        self.assertEqual(response.data['formatted_price'], 'S/ 90.00')
        self.assertIn('Packaging Plata', response.data['packaging_preview'])
        self.assertIn('dirección consciente', response.data['symbolic_meaning'])
        self.assertEqual(len(response.data['images']), 1)

    def test_product_detail_not_found(self):
        response = self.client.get('/api/v1/products/anillo-inexistente/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
