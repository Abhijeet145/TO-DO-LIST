const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = ["Buy Food","Cook Food","Eat Food"];

app.get("/",function(req,res){
    
    let today = new Date();
    let currentDay = today.getDay();
    let day = "";
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    day = today.toLocaleDateString("en-US", options);
    res.render("list",{kindOfDay: day,newitems: items});
        
});

app.post("/",function(req,res){
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
    //console.log(item);
});


app.listen(3000,function(){
    console.log("Server started at port 3000");
});