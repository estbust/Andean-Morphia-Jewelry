from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'quantity', 'unit_price', 'packaging_assigned', 'subtotal')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'order_number',
        'customer_full_name',
        'customer_email',
        'city',
        'total_amount',
        'status',
        'payment_method',
        'created_at',
    )
    list_filter = ('status', 'payment_method', 'city', 'created_at')
    search_fields = ('order_number', 'customer_full_name', 'customer_email', 'customer_phone')
    readonly_fields = ('order_number', 'total_amount', 'created_at', 'updated_at')
    inlines = [OrderItemInline]
