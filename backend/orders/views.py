import uuid
import random
import string
from decimal import Decimal
from django.db import transaction
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderCreateSerializer
from catalog.models import Product


def generate_unique_order_number():
    """Generates an order number in format AM-2026-XXXX."""
    while True:
        suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
        order_number = f"AM-2026-{suffix}"
        if not Order.objects.filter(order_number=order_number).exists():
            return order_number


class OrderCreateView(APIView):
    """
    Creates an order atomically with inventory deduction and automatic packaging assignment.
    """
    def post(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        items_data = validated_data['items']

        try:
            with transaction.atomic():
                total_amount = Decimal('0.00')
                products_to_process = []

                # Aggregate requested quantities by product_id to prevent race conditions within the same order
                aggregated_quantities = {}
                for item in items_data:
                    raw_id = str(item['product_id']).strip()
                    qty = item['quantity']
                    aggregated_quantities[raw_id] = aggregated_quantities.get(raw_id, 0) + qty

                # Lock and validate each product
                for raw_id, qty in aggregated_quantities.items():
                    product = None
                    try:
                        valid_uuid = uuid.UUID(str(raw_id).strip())
                        product = Product.objects.select_for_update().filter(id=valid_uuid, is_active=True).first()
                    except (ValueError, AttributeError):
                        pass

                    if not product:
                        product = Product.objects.select_for_update().filter(slug=raw_id, is_active=True).first()

                    if not product:
                        transaction.set_rollback(True)
                        return Response(
                            {'error': f"El producto '{raw_id}' no existe o no se encuentra activo."},
                            status=status.HTTP_400_BAD_REQUEST
                        )

                    if product.stock < qty:
                        transaction.set_rollback(True)
                        return Response(
                            {
                                'error': f"Stock insuficiente para '{product.name}'. "
                                         f"Disponible: {product.stock}, solicitado: {qty}."
                            },
                            status=status.HTTP_400_BAD_REQUEST
                        )

                    item_subtotal = product.price * qty
                    total_amount += item_subtotal
                    products_to_process.append((product, qty))

                # Deduct inventory
                for product, qty in products_to_process:
                    product.stock -= qty
                    product.save(update_fields=['stock'])

                # Create Order
                order = Order.objects.create(
                    order_number=generate_unique_order_number(),
                    customer_full_name=validated_data['customer_full_name'],
                    customer_email=validated_data['customer_email'],
                    customer_phone=validated_data['customer_phone'],
                    shipping_address=validated_data['shipping_address'],
                    city=validated_data['city'],
                    gift_note=validated_data.get('gift_note', ''),
                    payment_method=validated_data.get('payment_method', 'YAPE_PLIN_TRANSFER'),
                    total_amount=total_amount,
                    status='PENDING',
                )

                # Create OrderItems (save() triggers packaging_assigned logic)
                for product, qty in products_to_process:
                    OrderItem.objects.create(
                        order=order,
                        product=product,
                        quantity=qty,
                        unit_price=product.price
                    )

            output_serializer = OrderSerializer(order)
            return Response(output_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as exc:
            return Response(
                {'error': f"Error al procesar la orden: {str(exc)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class OrderDetailView(generics.RetrieveAPIView):
    """
    Retrieve order details by order_number or UUID id.
    """
    queryset = Order.objects.all().prefetch_related('items__product')
    serializer_class = OrderSerializer

    def get_object(self):
        lookup = self.kwargs.get('order_identifier')
        try:
            return Order.objects.prefetch_related('items__product').get(order_number=lookup)
        except Order.DoesNotExist:
            return generics.get_object_or_404(
                Order.objects.prefetch_related('items__product'),
                id=lookup
            )
