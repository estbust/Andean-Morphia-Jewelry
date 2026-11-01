from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from .filters import ProductFilter


class CategoryListView(generics.ListAPIView):
    """
    List of active jewelry categories.
    """
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    pagination_class = None  # Categories list is typically compact


class ProductListView(generics.ListAPIView):
    """
    List of jewelry products with comprehensive filtering:
    - category (slug or id)
    - metal / metal_type (ORO, PLATA)
    - featured / is_featured (true/false)
    - search by name, short description, symbolic meaning
    - ordering by price, name, created_at
    """
    queryset = Product.objects.filter(is_active=True).select_related('category').prefetch_related('images')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'short_description', 'symbolic_meaning', 'technical_details']
    ordering_fields = ['price', 'name', 'created_at']
    ordering = ['-created_at']


class ProductDetailView(generics.RetrieveAPIView):
    """
    Detailed product view accessed by slug, including full symbolic meaning and packaging preview.
    """
    queryset = Product.objects.filter(is_active=True).select_related('category').prefetch_related('images')
    serializer_class = ProductSerializer
    lookup_field = 'slug'
