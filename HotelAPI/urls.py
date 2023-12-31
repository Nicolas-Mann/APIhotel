from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.shortcuts import render

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('Users.urls')),
    path('api/habitaciones/', include('Rooms.urls')),
    path('api/reservas/',include('Bookings.urls')),
    path('reacttest', lambda req: render(req, 'indextest.html'))
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)