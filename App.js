var express= require('express');
var app=express();
const {Datastore}=require('@google-cloud/datastore');
var config=require('./config');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
//datastore client 
//const datastore= new Datastore({
//projectId:config.projectId,
//keyFile:config.keyFile
//});
const datastore= new Datastore();

//welcome response for the application
app.get('/',(req,res)=>{
    res.send('welcome to Customer API. Use /getCustomers for start');
})

//To fetch data from datastore
app.get('/getCustomers',(req,res)=>{
  //If no input is send all results will be shown
    var query=datastore.createQuery('Customer');
    datastore.runQuery(query,(err,data)=>{
    if(err)
        res.send({Message:"Error is:"+err});


    if(Object.keys(data).length==0)//If data is empty in datastore
        res.send({Message:'No data is available'});
    else
        res.send(data);//all data will be displayed
})
});
//To fetch data from datastore using a ID
app.get('/GetCustomer',(req,res)=>{
 
    var key=datastore.key(['Customer',parseInt(req.query.id)])
    datastore.get(key,(err,data)=>
    {
        if(err)
        res.send({Error: 'Error is:'+err});


    if(Object.keys(data).length==0)//If data is empty in datastore
        res.send({Message:'No data is available'});
    else
        res.send(data);//all data will be displayed
    });
       
})
//To insert the new customer data in the datastore.
app.post('/InsertCustomer',(req,res)=>{
    var keykind=datastore.key('Customer');
    console.log(req.body);
    console.log(req.body['Email']);
     var entity={
        key:keykind,
        data:{
            Email : req.body.Email,
            FirstName : req.body.FirstName,
            LastName : req.body.LastName,
            Phone : req.body.Phone,
            City : req.body.City
        }
    }
    console.log(entity);
    datastore.save(entity,()=>
    {
        res.status(200).send({Message:'Data successfully added'});
    })
})
//Update the existing customer data in the datastore.
app.put('/UpdateCustomer',(req,res)=>{
    var key=datastore.key(['Customer',parseInt(req.query.id)]);
   var entity={
        key:key,
        data:{
            Email : req.body.Email,
            FirstName : req.body.FirstName,
            LastName : req.body.LastName,
            Phone : req.body.Phone,
            City : req.body.City
        }
    }
    console.log(entity);
    datastore.update(entity,()=>
    {
        res.status(200).send({Message:'Data successfully Updated'});
    })
})
//To delete the existing customer data from datastore
app.delete('/DeleteCustomer',(req,res)=>{
     var key=datastore.key(['Customer',parseInt(req.query.id)]);
    datastore.delete(key,(err)=>
    {
        if(err)
        res.send({Message:"Error is:"+err});
        else
        res.status(200).send({Message:'Data successfully deleted'});
    });
    
})

var server=app.listen(process.env.PORT ||'3035', () => {
    console.log('Express server started at port :  http://localhost:%s',server.address().port);
});
