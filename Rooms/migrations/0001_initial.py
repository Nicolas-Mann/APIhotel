# Generated by Django 4.2.6 on 2023-10-16 17:01

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(max_length=50, verbose_name='Nombre')),
                ('room_type', models.CharField(max_length=50, verbose_name='Tipo')),
                ('max_capacity', models.IntegerField(verbose_name='Capacidad máxima')),
                ('price', models.IntegerField(verbose_name='Precio')),
                ('status', models.CharField(choices=[('Available', 'Disponible'), ('Not Available', 'No Disponible'), ('Maintenance', 'Mantenimiento')], max_length=20, verbose_name='Estado')),
            ],
            options={
                'verbose_name': 'Habitación',
                'verbose_name_plural': 'Habitaciones',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='RoomImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='room_images', verbose_name='Imagen')),
                ('description', models.CharField(blank=True, max_length=255, verbose_name='descripción')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='Rooms.room')),
            ],
            options={
                'verbose_name': 'Imagen de habitacion',
                'verbose_name_plural': 'Imagenes de habitaciones',
            },
        ),
    ]
