import uuid
from django.db import models


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    METAL_CHOICES = [
        ('ORO', 'Oro'),
        ('PLATA', 'Plata'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products'
    )
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    metal_type = models.CharField(
        max_length=10,
        choices=METAL_CHOICES,
        default='PLATA'
    )
    short_description = models.CharField(max_length=500)
    symbolic_meaning = models.TextField(
        help_text='Mandatory brand field: explains transformation, Andean heritage, personal evolution'
    )
    technical_details = models.TextField(
        help_text='Metal purity (e.g. Plata 950), stones, weight, craftsmanship'
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_path = models.CharField(
        max_length=255,
        help_text='Path to public asset, e.g., /products/chevron-ring.png'
    )
    stock = models.PositiveIntegerField(default=5)
    is_featured = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.metal_type})"

    @property
    def packaging_preview(self):
        if self.metal_type == 'ORO':
            return "Packaging Oro: Estuche especial + Bolsa de organza + Tarjeta de agradecimiento y cuidado Oro"
        return "Packaging Plata: Estuche gamuza celeste + Bolsa de organza + Tarjeta de agradecimiento y cuidado Plata"


class ProductImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image_path = models.CharField(max_length=255)
    alt_text = models.CharField(max_length=255, blank=True)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Product Image'
        verbose_name_plural = 'Product Images'
        ordering = ['-is_primary', 'created_at']

    def __str__(self):
        return f"Image for {self.product.name} ({self.image_path})"
