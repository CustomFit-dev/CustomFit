from django.contrib import admin
from .models import *

admin.site.register(Project)
@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['idProductos', 'imgProducto','PrecioProducto','Descripcion','Color_IdColor','Tela_idTela','Tallas_idTallas','','','']
    list_filter = ['fecha_creacion']
    search_fields = ['NombreProductos', 'Descripcion']