let express = require("express");
let app = express();//created an object to use module multiple times
let bodyparser = require("body-parser");
let fs = require("fs");

// whenever you use bodyparser and express module it is required to use this syntax
app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb',extended:true}));
app.use(express.json());
//above line must be at the end


//this syntax is must required to run you project on chrome
app.get("/",(req,res)=>{
    res.end("Welcome to API");
});

app.get("/users",(req,res)=>{
    let users = JSON.parse(fs.readFileSync("users.json").toString());
    res.end(JSON.stringify({data:users}));
});

app.get("/users/:id",(req,res)=>{
    let users = JSON.parse(fs.readFileSync("users.json").toString());
    res.end(JSON.stringify({data:users["user" + req.params.id]}));
});

app.post("/users",(req,res)=>{
    let body = req.body;
    let users = JSON.parse(fs.readFileSync("users.json").toString());
    users["user" + body.id] = body;
    fs.writeFileSync("users.json",JSON.stringify(users));
    res.end(JSON.stringify({status:"success"}));
});

app.put("/users/:id",(req,res)=>{
    let body = req.body;
    let users = JSON.parse(fs.readFileSync("users.json").toString());
    users["user" + req.params.id] = body;
    fs.writeFileSync("users.json",JSON.stringify(users));
    res.end(JSON.stringify({status:"success"}));
});

app.delete("/users/:id",(req,res)=>{
    let users = JSON.parse(fs.readFileSync("users.json").toString());
    delete users["user" + req.params.id];
    fs.writeFileSync("users.json",JSON.stringify(users));
    res.end(JSON.stringify({status:"success"}));
});


app.listen(8081,()=>{
    console.log("API running on http://localhost:8081/ or http://127.0.0.1:8081/");
})

