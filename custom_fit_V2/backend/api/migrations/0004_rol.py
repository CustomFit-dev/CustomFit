# Generated by Django 5.0.7 on 2024-08-01 11:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_userprofile_created_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='rol',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idrol', models.IntegerField()),
                ('nombrerol', models.CharField(max_length=20)),
                ('descripcion', models.CharField(max_length=255)),
            ],
        ),
    ]
