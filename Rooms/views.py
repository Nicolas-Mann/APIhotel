from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import RoomSerializer, RoomImageSerializer, RoomfilterSerializer
from .models import Room, RoomImage

class RoomFilterView(APIView):
    def get(self,request):
        num_adults = request.query_params.get('num_adults', 0)
        num_children = request.query_params.get('num_children', 0)
        rooms = Room.objects.filter(
            max_adult_capacity__gte=num_adults, 
            max_child_capacity__gte=num_children,
            status='Available'
        )
        serializer = RoomfilterSerializer(rooms, many=True, context={"request":request})
        return Response(serializer.data)
    
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
class RoomImageViewSet(viewsets.ModelViewSet):
    queryset = RoomImage.objects.all()
    serializer_class = RoomImageSerializer