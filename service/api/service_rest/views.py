from cmath import log
from pickle import FALSE
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Technician, AutomobileVO, Appointment
from .encoder import AppointmentEncoder, TechnicianEncoder
import json

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
            content = json.loads(request.body)
            try:
                technicians = Technician.objects.create(**content)
                return JsonResponse(
                    technicians,
                    encoder=TechnicianEncoder,
                    safe=False,
                )
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"message": "make sure the fields are filled properly"},
                    status=404,
                )

@require_http_methods(["DELETE"])
def api_technician(request, id):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"delete": count > 0})

@require_http_methods(["GET", "POST"])
def api_list_appointment(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            technician = content["technician"]
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message":"technician does not exist"},
                status=404,
            )
        try:
            if AutomobileVO.objects.get(vin=content["vin"]):
                content["vip"] = True
        except AutomobileVO.DoesNotExist:
            content["vip"] = False
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder = AppointmentEncoder,
                safe = False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "appointment does not exist"},
                status = 404,
            )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"delete": count > 0})

    else:
        request.method == "PUT"
        content = json.loads(request.body)
        Appointment.objects.filter(id=id).update(**content)
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
