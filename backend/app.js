const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user")
require("dotenv").config();
const app = express()

//middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Import file from outer
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const staffRoutes = require("./routes/staff");




//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connect DB");

    //default Admin here
    User.findOne({"role":0},(err,adminres)=>{
      if(!adminres){
            var admin={   
               "name":"Admin",
                "email": "admin@gmail.com",
                "password":"admin", 
                "role":0
            }
          
            const user = new User(admin);
            user.save((err, user) => {
              if (err) {
                  console.log(err)
              }
            
            });
        }

    })
    
   

});



//Middleware use
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


//my routes
app.use("/api" , authRoutes)
app.use("/api" , adminRoutes)
app.use("/api" , staffRoutes)





//test setup
app.get("/" , (req , res) =>{
    res.send("hello")
})


const port = process.env.PORT || 8000;
app.listen( port , () =>{
    console.log("server is running on port 8000")
}) 