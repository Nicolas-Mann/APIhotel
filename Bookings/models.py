from django.db import models
from model_utils.models import TimeStampedModel
from Clients.models import Client
from Rooms.models import Room

class Booking(TimeStampedModel):
    start_date = models.DateTimeField('Fecha de inicio')
    end_date = models.DateTimeField('Fecha de salida')
    num_adults = models.IntegerField('Número de adultos')
    num_children = models.IntegerField('Número de niños')
    total_price = models.IntegerField('Precio total')
    status = models.CharField('Estado',max_length=40)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Reserva'
        verbose_name_plural = 'Reservas'
        ordering = ['start_date']

class BookingRoomDetail(TimeStampedModel):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    num_adults = models.IntegerField('Número de adultos')
    num_children = models.IntegerField('Número de niños')
    specific_price = models.IntegerField('Precio específico')

    class Meta:
        verbose_name = 'Detalle de reservas'
        verbose_name_plural = 'Detalles de reservas'
