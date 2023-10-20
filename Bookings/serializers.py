from rest_framework import serializers
from .models import Booking, BookingRoomDetail

class BookinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id','start_date','end_date','num_adults','num_children','total_price','status','client']

class BookingRoomDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingRoomDetail
        fields = ['id','booking','room','num_adults','num_children','specific_price']