const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//variables to store items and work items
const items = ["Buy Food","Cook Food","Eat Food"];
const workItems = [];

//root route get and post
app.get("/",function(req,res){
    
    const day = date.getDate();
    res.render("list",{listTitle: day,newitems: items});
        
});


app.post("/",function(req,res){
    const item = req.body.newItem;

    if(req.body.item === 'Work List'){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});


//work route get  
app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List",newitems: workItems});
});

//about route get
app.get("/about",function(req,res){
    res.render("about");
})


//starting of the page
app.listen(3000,function(){
    console.log("Server started at port 3000");
});