from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder, DateEncoder
import json

# Create your views here.
@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=Appointment
        )
