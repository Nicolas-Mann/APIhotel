from django.db import models
from model_utils.models import TimeStampedModel

class Room(TimeStampedModel):
    ROOM_STATUS_CHOICES = [
        ('Available','Disponible'),
        ('Not Available','No Disponible'),
        ('Maintenance','Mantenimiento'),
    ]
    name = models.CharField('Nombre',max_length=50)
    room_type = models.CharField('Tipo',max_length=50)
    max_adult_capacity = models.IntegerField('Capacidad máxima de adultos')
    max_child_capacity = models.IntegerField('Capacidad máxima de niños')
    price = models.IntegerField('Precio')
    status = models.CharField('Estado',max_length=20, choices=ROOM_STATUS_CHOICES)

    class Meta:
        verbose_name = 'Habitación'
        verbose_name_plural = 'Habitaciones'
        ordering = ['name']

    def __str__(self):
        return self.name
    
class RoomImage(models.Model):
    room = models.ForeignKey(Room, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField('Imagen', upload_to='room_images')
    description = models.CharField('descripción', max_length=255, blank=True)

    class Meta:
        verbose_name = 'Imagen de habitacion'
        verbose_name_plural = 'Imagenes de habitaciones'

    def __str__(self):
        return self.description

