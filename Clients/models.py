from django.db import models
from model_utils.models import TimeStampedModel

class Client(TimeStampedModel):
    first_name = models.CharField('Nombres', max_length=50)
    last_name = models.CharField('Apellidos', max_length=50)
    email = models.EmailField('Email',unique=True)
    phone = models.CharField('Teléfono', max_length=12)

    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'
        ordering = ['first_name']

    def __str__(self):
        return self.first_name + ' ' + self.last_name