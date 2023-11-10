from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import RoomSerializer, RoomfilterSerializer
from .models import Room

class RoomFilterView(APIView):
    def get(self,request):
        num_adults = request.query_params.get('num_adults', 0)
        num_children = request.query_params.get('num_children', 0)
        rooms = Room.objects.filter(
            max_adult_capacity__gte=num_adults, 
            max_child_capacity__gte=num_children,
            status='Disponible'
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
    
