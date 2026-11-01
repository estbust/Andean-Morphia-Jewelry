from django.urls import path
from .views import OrderCreateView, OrderDetailView

urlpatterns = [
    path('orders/', OrderCreateView.as_view(), name='order-create-root'),
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/<str:order_identifier>/', OrderDetailView.as_view(), name='order-detail'),
]
