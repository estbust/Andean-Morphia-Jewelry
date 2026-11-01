from django.contrib import admin
from .models import Category, Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'category', 'metal_type', 'price', 'stock', 'is_featured', 'is_active', 'created_at')
    list_filter = ('metal_type', 'is_featured', 'is_active', 'category')
    search_fields = ('name', 'slug', 'short_description', 'symbolic_meaning', 'technical_details')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'image_path', 'is_primary', 'created_at')
    list_filter = ('is_primary',)
