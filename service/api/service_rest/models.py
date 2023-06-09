from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100)
    sold = models.BooleanField(null=True, blank=True)

class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.IntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.pk})

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.BooleanField()
    vin = models.CharField(max_length=50)
    customer = models.CharField(max_length=100)
    vip = models.BooleanField()

    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT
    )

    def get_api_url(self):
        return reverse("api_appointments", kwargs={"pk": self.pk})

    def __str__(self):
        return self.vin
