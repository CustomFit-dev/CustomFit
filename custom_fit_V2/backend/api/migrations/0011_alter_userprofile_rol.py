# Generated by Django 5.0.7 on 2024-08-01 12:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_rol_nrol'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='rol',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to='api.rol'),
        ),
    ]
