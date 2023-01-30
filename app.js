const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//variables to store items and work items
let items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];

//root route get and post
app.get("/",function(req,res){
    
    let today = new Date();
    let currentDay = today.getDay();
    let day = "";
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    day = today.toLocaleDateString("en-US", options);
    res.render("list",{listTitle: day,newitems: items});
        
});


app.post("/",function(req,res){
    let item = req.body.newItem;
    console.log(req.body);
    if(req.body.item === 'Work List'){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

});


//work route get and post
app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List",newitems: workItems});
});

app.get("/about",function(req,res){
    res.render("about");
})


//starting of the page
app.listen(3000,function(){
    console.log("Server started at port 3000");
});