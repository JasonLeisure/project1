from django.db import models
from django.urls import reverse
from django.db.models.signals import post_save
from django.dispatch import receiver


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.vin}, {self.id}"


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.IntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_show_customer", kwargs={"id": self.id})

    def __str__(self):
        return f"{self.phone_number}, {self.id}"


class SalesPerson(models.Model):
    name = models.CharField(max_length=255)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_show_salesperson", kwargs={"id": self.id})

    def __str__(self):
        return f"{self.employee_number}, {self.id}"


class Sale(models.Model):
    price = models.FloatField()
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="sale",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.CASCADE
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_list_sales", kwargs={"id": self.id})

    def __str__(self):
        return f"Sale {self.automobile}"


@receiver(post_save, sender=Sale)
def update_automobile_sold(sender, instance, **kwargs):
    if instance.automobile and not instance.automobile.sold:
        instance.automobile.sold = True
        instance.automobile.save()
