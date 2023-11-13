from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
from .models import Booking, BookingRoomDetail
from Rooms.models import Room
from .serializers import BookinSerializer, BookingRoomDetailSerializer
from Clients.models import Client
from Clients.serializers import ClientSerializer
from django.utils import timezone
from rest_framework.decorators import action

class CreateBookingView(APIView):
    
    # La decoración @transaction.atomic asegura que todas las operaciones 
    # en la base de datos se traten como una sola transacción. Si una operación
    # falla, todas las operaciones anteriores en el método serán deshechas.
    @transaction.atomic
    def post(self,request):
        # Obtiene los datos del cliente, reserva y detalles de reserva desde el cuerpo de la solicitud.
        client_data = request.data.get('client',{})
        booking_data = request.data.get('booking',{})
        booking_room_detail_data = request.data.get('booking_room_detail',[])

        # Validación del email del cliente.
        email = client_data.get('email')
        if not email:
            return Response({'error':'El email es requerido'},status=status.HTTP_400_BAD_REQUEST)

        # Si el cliente con el correo electrónico proporcionado ya existe, actualiza sus datos. 
        # Si no existe, crea uno nuevo.
        client_instance, created = Client.objects.update_or_create(
            email = email,
            defaults = client_data
        )

        # Asocia el cliente con la reserva.
        booking_data['client'] = client_instance.id

        # Validaciones de precio y capacidad maxima
        calculated_total_price = 0
        calculated_num_adults = 0
        calculated_num_children = 0

        for detail in booking_room_detail_data:
            # Obteniendo la habitacion de la base de datos
            room = Room.objects.get(id=detail['room'])
            # # Comprobando si el precio en bd es el mismo al del frontend
            # if room.price != detail['specific_price']:
            #     return Response({'Error':'Los precios no coinciden'})

            # Validando capacidad
            if detail['num_adults'] > room.max_adult_capacity or detail['num_children'] > room.max_child_capacity:
                return Response({'Error':f"La habitación {room.name} excede su capacidad"},status=status.HTTP_400_BAD_REQUEST)
            
            # Calculando el precio 
            calculated_total_price += room.price

            # Calculando total de adultos y niños
            calculated_num_adults += detail['num_adults']
            calculated_num_children += detail['num_children']

        # Comprobando el tatal de adultos y niños del detalle con el de la reserva
        if calculated_num_adults != booking_data['num_adults'] or calculated_num_children != booking_data['num_children']:
            return Response({'Error':'Las cantidades de huespues no coinciden'},status=status.HTTP_400_BAD_REQUEST)

        #Comprobando el precio total calculado con el enviado desde el frontend
        # print(calculated_total_price,booking_data['total_price'])
        # if calculated_total_price != booking_data['total_price']:
        #     return Response({'Error':'El precio total no coincide con el calculo del servidor'}, status=status.HTTP_400_BAD_REQUEST)

        # Serializa y valida los datos de la reserva.
        booking_serializer = BookinSerializer(data=booking_data)
        if not booking_serializer.is_valid():
            return Response(booking_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Guarda la reserva.
        booking_instance = booking_serializer.save()
        booking_id = booking_instance.id

        # Asocia cada detalle de reserva con la reserva creada.
        for detail in booking_room_detail_data:
            detail['booking'] = booking_id

        # Serializa y valida los detalles de reserva.
        details_serializer = BookingRoomDetailSerializer(data=booking_room_detail_data,many=True)
        if not details_serializer.is_valid():
            return Response(details_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        # Guarda los detalles de la reserva.
        details_serializer.save()

        # Responde con los datos de la reserva y sus detalles.
        return Response({
            'booking': booking_serializer.data,
            'booking_room_detail': details_serializer.data
        }, status=status.HTTP_201_CREATED)



class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookinSerializer

    def get_queryset(self):
        # Obtener el parámetro 'limit' de la solicitud
        limit = self.request.query_params.get('limit', None)

        # Verificar si se proporciona un límite y es un número válido
        if limit and limit.isdigit():
            # Aplicar el límite al queryset y ordenarlo por start_date
            queryset = Booking.objects.filter(start_date__gte=timezone.now()).order_by('start_date')[:int(limit)]
        else:
            # Devolver el queryset sin límite, ordenado por start_date
            queryset = Booking.objects.filter(start_date__gte=timezone.now()).order_by('start_date')

        return queryset

    @action(detail=False, methods=['get'], url_path='en-curso')
    def en_curso(self, request):
        # Obtener las reservas en curso
        now = timezone.now()
        reservations_en_curso = Booking.objects.filter(
           
            status='En curso'
        )
        
        print("Fecha actual:", now)
        print("Reservas en curso:", reservations_en_curso)  # Agrega este mensaje de registro
        
        serializer = BookinSerializer(reservations_en_curso, many=True)
        return Response(serializer.data)