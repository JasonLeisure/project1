from .models import AutomobileVO, Sale, SalesPerson, Customer
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .encoders import SalesPersonEncoder, SaleEncoder, CustomerEncoder, AutomobileVOEncoder


@require_http_methods(["GET"])
def api_list_automobile(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {
                "automobiles": automobiles,
            }, encoder=AutomobileVOEncoder,
        )


@require_http_methods(["GET", "POST"])
def api_list_salespersons(request):
    if request.method == "GET":
        return JsonResponse(
            {"salespersons": SalesPerson.objects.all()},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = SalesPerson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST", "DELETE"])
def api_show_salesperson(request, id):
    if request.method == "GET":
        salesperson = SalesPerson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = SalesPerson.objects.get(id=id).delete()
        return JsonResponse({"deleted": count})
    else:
        content = json.loads(request.body)
        SalesPerson.objects.filter(id=id).update(**content)
        salesperson = SalesPerson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":

        return JsonResponse(
            {"customers": Customer.objects.all()},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST", "DELETE"])
def api_show_customer(request, id):
    if request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count})
    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=id).update(**content)
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        return JsonResponse(
            {"sales": Sale.objects.all()},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            content["customer"] = Customer.objects.get(phone_number=content["customer"])
            content["salesperson"] = SalesPerson.objects.get(id=content["salesperson"])
            content["automobile"] = AutomobileVO.objects.get(vin=content["automobile"])
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Automobile"},
                status=404
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer"},
                status=404
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Salesperson"},
                status=404
            )
        sales = Sale.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SaleEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST", "DELETE"])
def api_show_sale(request, id):
    if request.method == "GET":
        sale = Sale.objects.filter(id=id)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False
        )
    else:
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST", "DELETE"])
def api_delete_sale(request, id):
    if request.method == "GET":
        sales = Sale.objects.get(id=id)
        return JsonResponse(
            sales,
            encoder=SaleEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count})
    else:
        content = json.loads(request.body)
        Sale.objects.filter(id=id).update(**content)
        sales = Sale.objects.get(id=id)
        return JsonResponse(
            sales,
            encoder=SaleEncoder,
            safe=False
        )
