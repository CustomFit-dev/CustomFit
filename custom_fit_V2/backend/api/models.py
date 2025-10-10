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
    PrecioEstampado = models.BigIntegerField()
    ImgEstampado = models.CharField(max_length=100)
    ColorEstampado = models.CharField(max_length=45)
    fecha_agregado = models.DateField(auto_now_add=True)  # ✅ fecha solo al crear
    Disponibilidad = models.CharField(max_length=45)
    updated_at = models.DateTimeField(auto_now=True)  # ✅ Django también actualiza solo

    class Meta:
        db_table = "estampado"


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