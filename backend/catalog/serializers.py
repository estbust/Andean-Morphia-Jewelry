from rest_framework import serializers
from .models import Category, Product, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    products_count = serializers.IntegerField(source='products.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'products_count', 'created_at']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image_path', 'alt_text', 'is_primary', 'created_at']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    metal_display = serializers.CharField(source='get_metal_type_display', read_only=True)
    formatted_price = serializers.SerializerMethodField()
    packaging_preview = serializers.ReadOnlyField()
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'category',
            'category_name',
            'category_slug',
            'name',
            'slug',
            'metal_type',
            'metal_display',
            'price',
            'formatted_price',
            'short_description',
            'symbolic_meaning',
            'technical_details',
            'image_path',
            'stock',
            'is_featured',
            'is_active',
            'packaging_preview',
            'images',
            'created_at',
            'updated_at',
        ]

    def get_formatted_price(self, obj):
        return f"S/ {obj.price:.2f}"
