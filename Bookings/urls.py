from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CreateBookingView, BookingViewSet

router = DefaultRouter()
router.register('ver-reservas', BookingViewSet, basename='booking')

urlpatterns = [
    path('crear-reserva', CreateBookingView.as_view()),
] + router.urls
