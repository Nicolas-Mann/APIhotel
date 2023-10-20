from django.urls import path
from .views import CreateBookingView

urlpatterns = [
    path('crear-reserva', CreateBookingView.as_view()),
] 
