from django.db import models
from model_utils.models import TimeStampedModel

class Audit(TimeStampedModel):
    ACTION_CHOICES = [
        ('Isert','Insert'),
        ('Update','Update'),
        ('Delete','Delete'),
    ]
    action = models.CharField('Acción', max_length=10, choices=ACTION_CHOICES)
    table_name = models.CharField('Nombre de la tabla', max_length=30)
    detail = models.CharField('Detalles',max_length=255)
    #user = models.ForeignKey()   Falta crear el modelo de usuario
