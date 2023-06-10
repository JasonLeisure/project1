# CarCar

Team:

* David - Services
* Jason - Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Microservice for Sales

Overview:
The sales microservice enables users to effectively manage and access sales-related data by performing the following actions:

Addition of Customers and Sales People through user-friendly forms.
Recording and tracking the complete sales history between Customers, Sales People, and Automobiles.
Efficient filtering of sales records based on the Sales Person.

Front-End:
The front-end interface of the Sales microservice empowers users with intuitive forms to seamlessly add Sales People, Customers, and create Sale Records. Some forms include dropdown menus to conveniently select and utilize existing records.
Additionally, users can access a comprehensive list of all sales records or filter records based on specific Sales People.

Back-End:
Every model within the back-end is intricately linked with the Sales Record model. The sales microservice leverages data from the inventory service to establish relationships between sales records and automobiles. This data is retrieved by polling the Inventory API, which identifies each record by a unique VIN number. The relevant information is then associated with an Automobile Value Object within the Sales microservice.

Polling:
The polling interval from Sales to Inventory is set at 60 seconds. This interval ensures synchronization with the self-updating dropdown menu for automobiles while creating a Sales Record. The dropdown menu refreshes every 60 seconds to reflect any newly added automobiles promptly. In case no vehicles are available for sale, a disclaimer will be displayed.
Each model provides dedicated views for creating, deleting, and listing records.
