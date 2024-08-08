from django.db import models

class Project(models.Model):
    name = models.CharField(unique=True,max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    comentarios = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class rol(models.Model):
    nombrerol = models.CharField(max_length=20, default= "User", null=True, blank=True)
    descripcion = models.CharField(max_length=255, default= "Usuario normal con permisos limitados", null=True, blank=True)


    def __str__(self):
        return self.nombrerol


class UserProfile(models.Model):
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    nombre_usuario = models.CharField(max_length=100)
    celular = models.CharField(max_length=15)
    correo_electronico = models.EmailField()
    conf_correo_electronico = models.EmailField()
    rol = models.ForeignKey(rol, on_delete=models.CASCADE, default=2, null=True, blank=True)
    codigo_verificacion = models.CharField(max_length=6, null=True, blank=True)
    fecha_sesion = models.DateTimeField(null=True, blank=True, auto_now_add=True)
    

    def __str__(self):
        return self.nombre_usuario
    



