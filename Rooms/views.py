from datetime import datetime
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import status
from .serializers import RoomSerializer, RoomfilterSerializer
from .models import Room

class RoomFilterView(APIView):
    def get(self,request):
        num_adults = request.query_params.get('num_adults', 0)
        num_children = request.query_params.get('num_children', 0)
        start_date = request.query_params.get('start_date')
        end_date  = request.query_params.get('end_date')
        rooms = Room.objects.filter(
            max_adult_capacity__gte=num_adults, 
            max_child_capacity__gte=num_children,
            status='Disponible'
        )

  
        if start_date and end_date:
            try:
                start_date = datetime.strptime(start_date, "%Y-%m-%dT%H:%M:%SZ")
                end_date = datetime.strptime(end_date, "%Y-%m-%dT%H:%M:%SZ")
            except ValueError:
                return Response({"error": "Formato de fecha inválido."}, status=status.HTTP_400_BAD_REQUEST)

            rooms = rooms.exclude(
                bookingroomdetail__booking__start_date__lt=end_date,
                bookingroomdetail__booking__end_date__gt=start_date
            )

        serializer = RoomfilterSerializer(rooms, many=True, context={"request":request})
        return Response(serializer.data)

    def post(self,request):
        num_adults = request.data.get('num_adults', 0)
        num_children = request.data.get('num_children', 0)
        rooms = Room.objects.filter(
            max_adult_capacity__gte=num_adults, 
            max_child_capacity__gte=num_children,
            status='Disponible'
        )
        serializer = RoomfilterSerializer(rooms, many=True, context={"request":request})
        return Response(serializer.data)
    
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
