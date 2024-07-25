# Generated by Django 5.0.7 on 2024-07-25 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_userprofile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='created',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='modificado',
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='correo_electronico',
            field=models.EmailField(max_length=254),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='nombre_usuario',
            field=models.CharField(max_length=100),
        ),
    ]
