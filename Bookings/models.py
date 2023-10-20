from django.db import models
from model_utils.models import TimeStampedModel
from Clients.models import Client
from Rooms.models import Room

class Booking(TimeStampedModel):
    STATUS_CHOICES = [
        ('Confirmada','Confirmada'),
        ('En curso','En curso'),
        ('Terminada','Terminada'),
        ('Cancelada','Cancelada'),
    ]

    start_date = models.DateTimeField('Fecha de inicio')
    end_date = models.DateTimeField('Fecha de salida')
    num_adults = models.IntegerField('Número de adultos')
    num_children = models.IntegerField('Número de niños')
    total_price = models.IntegerField('Precio total')
    status = models.CharField('Estado',max_length=40, choices=STATUS_CHOICES, default='Confirmada')
    client = models.ForeignKey(Client, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Reserva'
        verbose_name_plural = 'Reservas'
        ordering = ['start_date']

    def __str__(self):
        return 'id: '+ str(self.id) + ', ' + self.client.first_name + ' ' + self.client.last_name + ' día: ' + str(self.start_date)

class BookingRoomDetail(TimeStampedModel):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    num_adults = models.IntegerField('Número de adultos')
    num_children = models.IntegerField('Número de niños')
    specific_price = models.IntegerField('Precio específico')

    class Meta:
        verbose_name = 'Detalle de reservas'
        verbose_name_plural = 'Detalles de reservas'

    def __str__(self):
        return 'id: ' + str(self.booking.id) + ', ' + self.booking.client.first_name + ' ' + self.booking.client.last_name + ' Habitación ' + str(self.room.id)