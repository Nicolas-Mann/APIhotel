from rest_framework import serializers
from .models import Booking, BookingRoomDetail

class BookinSerializer(serializers.ModelSerializer):
    client_first_name = serializers.SerializerMethodField()
    client_last_name = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = ['id', 'start_date', 'end_date', 'num_adults', 'num_children', 'total_price', 'status', 'client', 'client_first_name', 'client_last_name']

    def get_client_first_name(self, obj):
        return f"{obj.client.first_name}"
    
    def get_client_last_name(self, obj):
        return f"{obj.client.last_name}"

class BookingRoomDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingRoomDetail
        fields = ['id','booking','room','num_adults','num_children','specific_price']