from django.urls import path, include
from . import views   # <-- AGREGA ESTA LÍNEA
from .views import (
    home, register_user, enviar_codigo_view, login_view,
    UserViewSet, delete_user, logout_view, update_user,
    tela_list, tela_detail,
    talla_list, talla_detail, talla_create, talla_update_delete,
    estampado_list, estampado_detail, estampado_create, estampado_update_delete, estampados_usuario_list,
    color_list, color_detail, color_create, color_update_delete,
    producto_list, producto_detail, producto_create, producto_update_delete,
    proveedor_solicitud_list, proveedor_solicitud_detail,
    productos_personalizados_list, productos_personalizados_detail,
    estampados_emoji_list,
    obtener_carrito, agregar_al_carrito, actualizar_item, eliminar_item,
    finalizar_compra   # también puedes agregar este aquí
)

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'userprofiles', UserViewSet)

urlpatterns = [
    path('', home, name='home'),

    # Auth
    path('api/register/', register_user, name='register_user'),
    path('api/enviar_codigo/', enviar_codigo_view, name='enviar_codigo'),
    path('api/login/', login_view, name='login'),
    path('api/logout/', logout_view, name='logout'),
    path('api/', include(router.urls)),
    path('api/delete-user/<int:pk>/', delete_user, name='delete-user'),
    path('api/update-user/<int:pk>/', update_user, name='update-user'),

    # Telas
    path('api/telas/', tela_list, name='tela-list'),
    path('api/telas/<int:pk>/', tela_detail, name='tela-detail'),

    # Tallas
    path('api/tallas/', talla_list, name='talla-list'),
    path('api/tallas/<int:pk>/', talla_detail, name='talla-detail'),
    path('api/tallas/create/', talla_create, name='talla-create'),
    path('api/tallas/<int:pk>/edit/', talla_update_delete, name='talla-update-delete'),

    # Estampados
    path('api/estampados/', estampado_list, name='estampado-list'),
    path('api/estampados/<int:pk>/', estampado_detail, name='estampado-detail'),
    path('api/estampados/create/', estampado_create, name='estampado-create'),
    path('api/estampados/<int:pk>/edit/', estampado_update_delete, name='estampado-update-delete'),
    path('api/estampados_usuario/', estampados_usuario_list, name='estampado-usuario-list'),
    path('api/estampados_emoji/', estampados_emoji_list, name='estampado-emoji-list'),

    # Colores
    path('api/colores/', color_list, name='color-list'),
    path('api/colores/<int:pk>/', color_detail, name='color-detail'),
    path('api/colores/create/', color_create, name='color-create'),
    path('api/colores/<int:pk>/edit/', color_update_delete, name='color-update-delete'),

    # Productos
    path('api/productos/', producto_list, name='producto-list'),
    path('api/productos/<int:pk>/', producto_detail, name='producto-detail'),
    path('api/productos/create/', producto_create, name='producto-create'),
    path('api/productos/<int:pk>/edit/', producto_update_delete, name='producto-update-delete'),

    # Productos personalizados
    path('api/productos_personalizados/', productos_personalizados_list, name='productos-personalizados-list'),
    path('api/productos_personalizados/<int:pk>/', productos_personalizados_detail, name='productos-personalizados-detail'),

    # Proveedores
    path('api/proveedorsolicitudes/', proveedor_solicitud_list, name='proveedor-solicitud-list'),
    path('api/proveedorsolicitudes/<int:pk>/', proveedor_solicitud_detail, name='proveedorsolicitud-detail'),

    # Carrito por usuario
    path('api/carrito/obtener/', obtener_carrito, name="carrito-obtener"),
    path('api/carrito/agregar/', agregar_al_carrito, name="carrito-agregar"),
    path('api/carrito/actualizar/', actualizar_item, name="carrito-actualizar"),
    path('api/carrito/eliminar/', eliminar_item, name="carrito-eliminar"),
    
    path('checkout/finalizar/', finalizar_compra, name='finalizar_compra'),


]
