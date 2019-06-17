This application exposes CRUD ReSTApis to perform CRUD operations on google datastore and app is deployed on google app engine.
This application uses nodejs and express framework to develop 5 apis. The apis are used to create and manipulate the customer data in google data store.


How to use

Node should install on local machine 
>npm init 
For dependencies add use 
>npm i express
>npm i body-parser

The application has been deployed in google app engine using standard environment.

For deploying the application in google app engine
download the google SDK. 
$gcloud auth login
$gcloud config set project projectId
$gcloud app deploy

Apis exposed by the application.

For getting the all the customer
/getCustomers

For retrieving  customer by id
/GetCustomer?id=123456789

For inserting a new customer
/InsertCustomer

For updating the customer
/UpdateCustomer?id=12345678

For deleting the customer
/DeleteCustomer?id=12345678

application can be accessed by using below Provisional url
https://nodejspoc-243717.appspot.com/
