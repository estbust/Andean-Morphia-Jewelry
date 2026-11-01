import uuid
from decimal import Decimal
from rest_framework import serializers
from .models import Order, OrderItem
from catalog.models import Product


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_slug = serializers.CharField(source='product.slug', read_only=True)
    product_image = serializers.CharField(source='product.image_path', read_only=True)
    metal_type = serializers.CharField(source='product.metal_type', read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            'id',
            'product',
            'product_name',
            'product_slug',
            'product_image',
            'metal_type',
            'quantity',
            'unit_price',
            'subtotal',
            'packaging_assigned',
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    formatted_total = serializers.SerializerMethodField()
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'order_number',
            'customer_full_name',
            'customer_email',
            'customer_phone',
            'shipping_address',
            'city',
            'gift_note',
            'total_amount',
            'formatted_total',
            'status',
            'status_display',
            'payment_method',
            'items',
            'created_at',
            'updated_at',
        ]

    def get_formatted_total(self, obj):
        return f"S/ {obj.total_amount:.2f}"


class OrderCreateItemInputSerializer(serializers.Serializer):
    product_id = serializers.CharField()
    quantity = serializers.IntegerField(min_value=1, default=1)


class OrderCreateSerializer(serializers.Serializer):
    customer_full_name = serializers.CharField(max_length=255)
    customer_email = serializers.EmailField()
    customer_phone = serializers.CharField(max_length=50)
    shipping_address = serializers.CharField()
    city = serializers.CharField(max_length=100)
    gift_note = serializers.CharField(required=False, allow_blank=True, default='')
    payment_method = serializers.CharField(required=False, default='YAPE_PLIN_TRANSFER')
    items = OrderCreateItemInputSerializer(many=True, allow_empty=False)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("La orden debe contener al menos un producto.")
        return value
