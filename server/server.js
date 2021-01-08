const express = require('express');
const morgan = require('morgan'); //read html and show in terminal; middleware
const bodyparser = require('body-parser'); //parse the data into proper format; middleware
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");

const User = require('./models/user');

dotenv.config();

const app = express();

mongoose.connect(
    process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    err=>{
        if(err){
            console.log(err);
        }else{
            console.log("Connected to the database");
        }
    }
)

//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

//GET - Retrieve data from the serer

//require apis
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');

app.use("/api",productRoutes);
app.use("/api",categoryRoutes);
app.use("/api",ownerRoutes);

app.listen(2000, err => {
    if(err){
        console.log(err);
    }else{
        console.log("Listening on PORT", 2000);
    }
});

/*app.get("/", (req,res) =>{
    res.json("Hello amazon clone");
});

//POST - send data from frontend to backend
app.post("/",(req,res) =>{ 
    // console.log(req.body.name); 
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(err =>{
        if(err){
            res.json(err);
        }else{
            res.json("successfully saved");
        }
    })   
})*/