from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', views.home),

    # DRF Router
    path('api/', include(router.urls)),

    # User endpoints
    path('api/register/', views.register_user),
    path('api/enviar-codigo/', views.enviar_codigo_view),
    path('api/login/', views.login_view),
    path('api/logout/', views.logout_view),
    path('api/delete-user/<int:pk>/', views.delete_user),
    path('api/update-user/<int:pk>/', views.update_user),

    # Telas
    path('api/telas/', views.tela_list),
    path('api/telas/<int:pk>/', views.tela_detail),

    # Proveedores
    path('api/proveedores/', views.proveedor_list, name='proveedor-list'),
    path('api/proveedores/<int:pk>/', views.proveedor_detail, name='proveedor-detail'),
]
