# Generated by Django 5.1.1 on 2024-10-08 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_userprofile_codigo_verificacion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
