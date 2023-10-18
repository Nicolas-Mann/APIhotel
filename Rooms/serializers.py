from rest_framework import serializers
from .models import Room, RoomImage

class RoomImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomImage
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    images = RoomImageSerializer(many=True)
    class Meta:
        model = Room
        fields = ['id','name','room_type','max_adult_capacity', 'max_child_capacity','price', 'status','images']
    
class RoomfilterSerializer(serializers.ModelSerializer):
    images = RoomImageSerializer(many=True)
    class Meta:
        model = Room
        fields = ['name','room_type','max_adult_capacity', 'max_child_capacity','price','images']

