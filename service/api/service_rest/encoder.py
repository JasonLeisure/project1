from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder, DateEncoder
import json

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "name",
        "employee_number"
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }
