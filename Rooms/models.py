from django.db import models
from model_utils.models import TimeStampedModel

class Room(TimeStampedModel):
    ROOM_STATUS_CHOICES = [
        ('Disponible','Disponible'),
        ('No Disponible','No Disponible'),
        ('Mantenimiento','Mantenimiento'),
    ]
    name = models.CharField('Nombre',max_length=50)
    room_type = models.CharField('Tipo',max_length=50)
    max_adult_capacity = models.IntegerField('Capacidad máxima de adultos')
    max_child_capacity = models.IntegerField('Capacidad máxima de niños')
    price = models.IntegerField('Precio')
    status = models.CharField('Estado',max_length=20, choices=ROOM_STATUS_CHOICES)
    image = models.ImageField('Imagen', upload_to='room_images', blank=True, null=True)

    class Meta:
        verbose_name = 'Habitación'
        verbose_name_plural = 'Habitaciones'
        ordering = ['name']

    def __str__(self):
        return 'id: ' + str(self.id) + ', ' + self.name
    

