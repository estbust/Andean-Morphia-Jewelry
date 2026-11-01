from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

api_v1_patterns = [
    path('', include('catalog.urls')),
    path('', include('orders.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    # Versioned and unversioned API routes
    path('api/', include(api_v1_patterns)),
    path('api/v1/', include(api_v1_patterns)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
