var express = require('express');
var mongoose=require("mongoose");
var session=require("express-session")
var cookieParser=require("cookie-parser")
var app=express();
var bodyParser=require("body-parser")
var port=process.env.PORT||10001;
var controllersJzp=require("./controllers/Admin.js")
var db=mongoose.connect("mongodb://localhost:27017/admin");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views","./views")
app.set("view engine","jade")
app.use(express.static(__dirname + '/views/'));
app.use(express.static(__dirname + '/images/'));
app.get("/",controllersJzp.Index)
app.post("/tianjia",controllersJzp.Add)
app.post("/newhead",controllersJzp.head)
app.listen(port);
console.log("端口:"+port)

















