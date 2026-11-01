import uuid
from django.db import models
from catalog.models import Product


class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pendiente'),
        ('PAID', 'Pagado'),
        ('SHIPPED', 'Enviado'),
        ('DELIVERED', 'Entregado'),
        ('CANCELLED', 'Cancelado'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_number = models.CharField(max_length=32, unique=True)
    customer_full_name = models.CharField(max_length=255)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=50)
    shipping_address = models.TextField()
    city = models.CharField(max_length=100)
    gift_note = models.TextField(blank=True, default='')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )
    payment_method = models.CharField(max_length=50, default='YAPE_PLIN_TRANSFER')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'
        ordering = ['-created_at']

    def __str__(self):
        return f"Order {self.order_number} - {self.customer_full_name} ({self.get_status_display()})"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        related_name='items',
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT
    )
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    packaging_assigned = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = 'Order Item'
        verbose_name_plural = 'Order Items'

    def save(self, *args, **kwargs):
        if self.product:
            if self.product.metal_type == 'PLATA':
                self.packaging_assigned = "Packaging Plata: Estuche gamuza celeste + Bolsa de organza + Tarjeta de agradecimiento y cuidado Plata"
            elif self.product.metal_type == 'ORO':
                self.packaging_assigned = "Packaging Oro: Estuche especial + Bolsa de organza + Tarjeta de agradecimiento y cuidado Oro"
        if not self.unit_price and self.product:
            self.unit_price = self.product.price
        super().save(*args, **kwargs)

    @property
    def subtotal(self):
        return self.unit_price * self.quantity

    def __str__(self):
        return f"{self.quantity}x {self.product.name} (Order {self.order.order_number})"
