from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id','name','room_type','max_adult_capacity', 'max_child_capacity','price', 'status','image']
    
class RoomfilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id','name','room_type','max_adult_capacity', 'max_child_capacity','price', 'image']

