from django.db import models
from django.contrib.auth.models import User

class Rol(models.Model):
    nombrerol = models.CharField(max_length=20, default="User", null=True, blank=True)
    descripcion = models.CharField(max_length=255, default="Usuario normal con permisos limitados", null=True, blank=True)

    def __str__(self):
        return self.nombrerol


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    nombre_usuario = models.CharField(max_length=100)
    celular = models.CharField(max_length=15)
    correo_electronico = models.EmailField()
    conf_correo_electronico = models.EmailField()
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, related_name='usuarios', default=2, null=True, blank=True)
    codigo_verificacion = models.CharField(max_length=6, null=True, blank=True)
    fecha_sesion = models.DateTimeField(null=True, blank=True, auto_now_add=True)

    def __str__(self):
        return self.nombre_usuario

    @property
    def email(self):
        return self.user.email

    @property
    def username(self):
        return self.user.username


class Project(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    comentarios = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Tela(models.Model):
    idTela = models.BigAutoField(primary_key=True)
    NombreTela = models.CharField(max_length=45)
    fecha_agregado = models.DateField()
    Disponibilidad = models.CharField(max_length=45)
    updated_at = models.DateTimeField(auto_now=True)
    precio = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = 'tela'
        managed = False  # porque la tabla ya existe en tu base de datos

    def __str__(self):
        return self.NombreTela
        

class Estampado(models.Model):
    idEstampado = models.BigAutoField(primary_key=True)
    NombreEstampado = models.CharField(max_length=45)
    TipoEstampado = models.CharField(max_length=45)
    ImgEstampado = models.CharField(max_length=100)
    ColorEstampado = models.CharField(max_length=45)
    fecha_agregado = models.DateField(auto_now_add=True)  # ✅ se agrega automáticamente la fecha actual
    updated_at = models.DateTimeField(auto_now=True)      # ✅ se actualiza al modificar el registro
    PrecioEstampado = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = 'estampado'
        managed = False  # porque la tabla ya existe en la base de datos

    def __str__(self):
        return self.NombreEstampado



from django.db import models

class Producto(models.Model):
    idProductos = models.BigAutoField(primary_key=True)
    NombreProductos = models.CharField(max_length=45)
    TipoProductos = models.CharField(max_length=45)
    PrecioProducto = models.BigIntegerField()
    Descripcion = models.CharField(max_length=255)
    fecha_creacion = models.DateField(auto_now_add=True)
    fecha_actualizacion = models.DateField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    urlFrontal = models.CharField(max_length=100, null=True, blank=True)
    urlEspaldar = models.CharField(max_length=100, null=True, blank=True)
    urlMangaIzquierda = models.CharField(max_length=100, null=True, blank=True)
    urlMangaDerecha = models.CharField(max_length=100, null=True, blank=True)
    Tallas = models.CharField(max_length=50)
    Color = models.CharField(max_length=50)
    Tela_idTela = models.ForeignKey('Tela', on_delete=models.DO_NOTHING, db_column='Tela_idTela')

    class Meta:
        db_table = 'productos'
        managed = False

class ProveedorSolicitud(models.Model):
    id_solicitud = models.AutoField(primary_key=True, db_column='id_solicitud')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, db_column='usuario_id')
    nit_cedula = models.CharField(max_length=30, null=False, db_column='Nitcedula')
    direccion = models.CharField(max_length=255, null=False)
    nombre_empresa = models.CharField(max_length=255, null=False, db_column='NombreEmpresa')
    descripcion_empresa = models.TextField(null=False, db_column='descripcionEmpresa')
    anios_experiencia = models.IntegerField(null=False, db_column='AñosExp')
    estado = models.CharField(
        max_length=20,
        choices=[('Pendiente', 'Pendiente'), ('Aceptado', 'Aceptado')],
        default='Pendiente',
        null=False,
        db_column='Estado'
    )

    class Meta:
        db_table = 'proveedorsolicitud'


class ProductosPersonalizados(models.Model):
    # Ajustado para mapear a la tabla existente en la BD `productosperonalizaos`
    idProductosPeronalizaos = models.BigAutoField(primary_key=True, db_column='idProductosPeronalizaos')
    NombrePersonalizado = models.CharField(max_length=45, null=True, blank=True, db_column='NombrePersonalizado')
    precioPersonalizado = models.FloatField(null=True, blank=True, db_column='precioPersonalizado')
    rolProducto = models.CharField(max_length=45, null=True, blank=True, db_column='rolProducto')
    stock = models.IntegerField(default=0, db_column='stock')
    productos_idProductos = models.ForeignKey('Producto', on_delete=models.CASCADE, db_column='productos_idProductos')
    urlFrontal = models.CharField(max_length=100, null=True, blank=True, db_column='urlFrontal')
    urlEspadarl = models.CharField(max_length=100, null=True, blank=True, db_column='urlEspadarl')
    urlMangaDerecha = models.CharField(max_length=100, null=True, blank=True, db_column='urlMangaDerecha')
    urlMangaIzquierda = models.CharField(max_length=100, null=True, blank=True, db_column='urlMangaIzquierda')
    estampados = models.ManyToManyField('Estampado', through='ProductosPersonalizadosHasEstampado', related_name='personalizados', blank=True)

    class Meta:
        db_table = 'productosperonalizaos'
        managed = False  # usamos tabla existente

    def __str__(self):
        return self.NombrePersonalizado or f"Personalizado {self.idProductosPeronalizaos}"


# Nuevo modelo que representa la tabla intermedia existente
class ProductosPersonalizadosHasEstampado(models.Model):
    ProductosPeronalizaos_idProductosPeronalizaos = models.ForeignKey(ProductosPersonalizados, db_column='ProductosPeronalizaos_idProductosPeronalizaos', on_delete=models.CASCADE)
    estampado_idEstampado = models.ForeignKey(Estampado, db_column='estampado_idEstampado', on_delete=models.CASCADE)

    class Meta:
        db_table = 'productosperonalizaos_has_estampado'
        managed = False
        unique_together = (('ProductosPeronalizaos_idProductosPeronalizaos','estampado_idEstampado'),)

        