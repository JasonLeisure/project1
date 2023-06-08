from django.urls import path
from .views import api_technician, api_technicians, api_list_appointment, api_show_appointment

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:id>/", api_technician, name="api_technician"),
    path("appointments/", api_list_appointment, name="api_list_appointments"),
    path("appointments/<int:id>/", api_show_appointment, name="api_show_appointment"),
]
