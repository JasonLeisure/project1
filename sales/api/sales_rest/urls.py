from django.urls import path
from .views import api_list_salespersons, api_list_automobile, api_show_salesperson, api_list_customers, api_show_customer, api_list_sales, api_delete_sale

urlpatterns = [
    path("salespeople/", api_list_salespersons),
    path("salespeople/<int:id>/", api_show_salesperson),
    path("customers/", api_list_customers),
    path("customers/<int:id>/", api_show_customer),
    path("sales/", api_list_sales),
    path("sales/<int:id>/", api_delete_sale),
    path("vin/", api_list_automobile)
]
