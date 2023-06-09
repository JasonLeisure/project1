from .models import AutomobileVO, Customer, SalesPerson, Sale
from common.json import ModelEncoder


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold", "id"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["name", "address", "phone_number", "id"]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name", "employee_number", "id"]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["price", "salesperson", "customer", "automobile", "id"]
    encoders = {
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
