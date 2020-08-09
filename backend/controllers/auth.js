
const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

const userRole={
    "admin":0,
    "staff":1,
   
}

//signup controller
exports.signup = (req, res) => {
   
   const errors = validationResult(req)
   if(!errors.isEmpty() ){
       return res.status(422).json({
           errors:errors.array()[0].msg
        
       })

   }
   var {userType}=req.body;
   var role=userRole[userType];
   var {userType,...userData}=req.body;
//    console.log(userData)
   userData.role=role;
  const user = new User(userData);
  user.save((err, user) => {
    if (err) {
        console.log(err)
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name, 
      email: user.email,
      id: user._id,
      role:user.role
    });
  });
};




//signin
exports.signin = (req , res) => {
    const errors = validationResult(req);
    const { email , password} = req.body;
// console.log("SIGNIN" , req.body)



    if(!errors.isEmpty() ){
        return res.status(422).json({
            errors:errors.array()[0].msg
         
        });
 
    }
    User.findOne({email} , (err , user) =>{
        // console.log(user)
        if(err || !user){
             return res.status(400).json({
                errors:"USER email does not found"
                
                
            });
        }
        if(!user.autheticate(password) ){
            return res.status(401).json({
                errors:"password is not match"
            });

        }

    //   Create token
    const token = jwt.sign({_id:user._id}, process.env.SECRET );
  
     // put token in cookie/browser
    res.cookie("token" , token ,{ expire :new Date() +9999} );
   
    // send Response to front end
    const {_id ,name ,email , role} = user;
    return res.json({ token, user: {_id ,name,  email,  role}});

    });
};


//logout
exports.signout = (req, res) => {
    res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};


// protected route
exports.isSignedIn = expressJwt({

    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty:"auth",

})

//custom middleware
exports.isAuthenticated = (req , res , next) => {
    // console.log("isAuthenticated",req.body)
   
    
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
   

    if(!checker){
        return res.status(403).json({
            error:"Acces denied"

        });
    }
    next();
};

exports.isAdmin = (req , res , next) =>{
 if( req.profile.role === 1 && req.profile.role === 2){
     return res.status(403).json({
         error:" you are not Admin! , Acces Denied" 
     });

 }

    next();
};

exports.isStaff = (req , res , next) =>{
    if( req.profile.role === 0 && req.profile.role === 2){
        return res.status(403).json({
            error:" you are not staff! , Acces Denied" 
        });
   
    }
   
       next();
   };