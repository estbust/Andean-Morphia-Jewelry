import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(method='filter_category')
    metal = django_filters.CharFilter(field_name='metal_type', lookup_expr='iexact')
    metal_type = django_filters.CharFilter(field_name='metal_type', lookup_expr='iexact')
    featured = django_filters.BooleanFilter(field_name='is_featured')
    is_featured = django_filters.BooleanFilter(field_name='is_featured')
    is_active = django_filters.BooleanFilter(field_name='is_active')
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Product
        fields = [
            'category',
            'metal',
            'metal_type',
            'featured',
            'is_featured',
            'is_active',
            'min_price',
            'max_price',
        ]

    def filter_category(self, queryset, name, value):
        if not value:
            return queryset
        if value.isdigit():
            return queryset.filter(category_id=int(value))
        return queryset.filter(category__slug__iexact=value)
