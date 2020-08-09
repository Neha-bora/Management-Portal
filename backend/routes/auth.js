var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signin, signup, signout } = require('../controllers/auth');

router.post("/signup" ,[
    check('name', " Name should be atleast 3 char").isLength({min:3}),
    check("email" , "email should be required").isEmail(),
    check('password' , " Password should be more then 4 char").isLength({ min: 4})
] , signup)


router.post("/signin" ,[
  
    check("email" , "email is required").isEmail(),
    check('password' , "Password is required ").isLength({ min: 4})
] , signin)

router.get("/signout" , signout)

module.exports =router;