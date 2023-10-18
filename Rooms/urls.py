from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import RoomFilterView, RoomViewSet, RoomImageViewSet

router = DefaultRouter()
router.register('imagenes-habitacion', RoomImageViewSet)
router.register('habitaciones', RoomViewSet)

urlpatterns = [
    path('listar-habitaciones-filtro', RoomFilterView.as_view()),
] + router.urls
