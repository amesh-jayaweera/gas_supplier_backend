const mysql =require('mysql');
const express =require('express');
var app = express();
const bodyParser =require('body-parser');
app.use(bodyParser.json());
var path = require('path');
var cors = require('cors');

app.use(cors());

const hostname = '127.0.0.1';
const port = 3000;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Amesh@1997@4"
});

app.listen(3000,()=>console.log('Express server is running at port:3000'));

// Create database, tables and insert values
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS gassuppliercomparsiondb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  var sql1 = "USE gassuppliercomparsiondb";
  con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("DB Changed");
  });

  var sql2 = "CREATE TABLE IF NOT EXISTS company (name VARCHAR(255) primary key, standing_gas double, per_unit_gas double, online int,direct_debit int, paperless_billing int)";
  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Company Table created");
    var sql3 = "INSERT INTO company VALUES('A',10.0,1.18,3,10,5),('B',20.0,0.5,5,3,10),('C',30.0,0.18,10,5,null)";
    con.query(sql3, function (err, result) {
     
     });
  });

  var sql4 = "CREATE TABLE IF NOT EXISTS form_details_know_usage (datetime datetime, surname varchar(255), email varchar(255), phone_number varchar(10) , address varchar(255), direct_debit varchar(100),online_account varchar(100),paperless_billing varchar(100), gas_usage_per_year double, company_a double,company_b double,company_c double)"; 
  var sql5 = "CREATE TABLE IF NOT EXISTS form_details_dont_know_usage (datetime datetime, surname varchar(255), email varchar(255), phone_number varchar(10) , address varchar(255), bedrooms int, occupants int,house_type varchar(100), company_a double,company_b double,company_c double)"; 
  con.query(sql4, function (err, result) {
  });

  con.query(sql5, function (err, result) {
  });
});

app.get('/companies',(req,res)=>{
  con.query('SELECT * FROM company',(err,rows,feilds)=>{
      if(!err)
         res.send(rows)
     else
         console.log(err);
  });
});

app.get('/form_details_dont_know_usage',(req,res)=>{
  con.query('SELECT house_type,bedrooms FROM form_details_dont_know_usage',(err,rows,feilds)=>{
      if(!err)
         res.send(rows)
     else
         console.log(err);
  });
});



app.post('/saveFormDetailsKnow',(req,res)=>{
  console.log(req.body);
  var sql = "INSERT INTO form_details_know_usage VALUES ?";
  var values = [
    [req.body.datetime.toString().slice(0, 19).replace('T', ' '),req.body.surname,req.body.email,req.body.phone_number,req.body.address,req.body.direct_debit,req.body.online_account,req.body.paperless_billing,req.body.gas_usage_per_year,req.body.company_a,req.body.company_b,req.body.company_c]
  ];

  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

  res.send(200); // send status OK
});

app.post('/saveFormDetailsDontKnow',(req,res)=>{
  console.log(req.body);
  var sql = "INSERT INTO form_details_dont_know_usage VALUES ?";
  var values = [
    [req.body.datetime.toString().slice(0, 19).replace('T', ' '),req.body.surname,req.body.email,req.body.phone_number,req.body.address,req.body.bedrooms,req.body.occupants,req.body.house_type,req.body.company_a,req.body.company_b,req.body.company_c]
  ];

  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

  res.send(200); // send status OK
});