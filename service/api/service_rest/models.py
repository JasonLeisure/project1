from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vo_vin = models.CharField(max_lenth=100)
    sold = models.BigIntegerField

class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.employee_id

class Appointment(models.Model):
    date_time = models.DateField
    reason = models.CharField(max_length=200)
    status = models.BooleanField
    vin = models.CharField(max_length=50)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        AutomobileVO,
        related_name="tech",
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.customer
