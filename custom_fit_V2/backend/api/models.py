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