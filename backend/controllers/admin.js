const User = require("../models/user")

const { check, validationResult } = require('express-validator');
const Lead = require("../models/lead");


exports.getUserById = (req , res   ,   next , id  ) => {
    User.findById(id).exec((err , user) => {
        //  console.log("USERID" , user)
       
        if(err || !user){
            return res.status(400).json({
 
              error:"No user was found in DB"
            }); 
         }
         req.profile = user;
         next();
     });
 };
 
 
//all staff
exports.allStaff = ( req , res) =>{
    User.find({  role:1  } )
    .exec( ( err , staff) => {
        if( err) {
            return res.status(400).json({
                error: " Not staff in db"
            });
        }
        return res.json(staff);
    });
}

//view leads
exports.viewLeads = ( req , res) =>{
    Lead.find({ useful:true})
    .exec(( err , lead ) =>{
        if(err){
            return res.status(400).json({
                error:"No lead found"
            });
        }
        return res.json(lead)
    })   
}



//delete
exports.removeStaff = (req , res) =>{
  
    let id = req.params.staffId
        // console.log("DELETEID" , req.params.staffId)
    User.deleteOne({_id:id}, (err , staff) =>{ 
        if(err){
            return res.status(400).json({
                error:"Failed to delete lead"
            });
        }
        res.json(
           { message:"Deleted succesfully"}
        ) 
    });
    
};


//update staff
exports.updateStaff = ( req , res ) =>{
   
    const errors = validationResult(req)
    if(!errors.isEmpty() ){
        return res.status(422).json({
            errors:errors.array()[0].msg       
        }) 
    }
   
  var id = req.params.staffId;
  var updateName= req.body.name;
  var updateEmail = req.body.email ;
  var updatePassword = req.body.password ;

  User.updateOne(
    { _id: id },
    { $set: { name:updateName, email:updateEmail ,password:updatePassword } },
    (err, staff) => {
        if(err){ 
                    return res.status(400).json({
                        error:"Failed to update Staff"
                    });
                }
                res.json(staff);
      
      }
    
  );
  };

  //signle Staff

exports.getastaff = (req , res ) =>{
  
    User.findOne({_id: req.params.staffId},(err, staff) =>{
        if(err) {
            return res.json(err);
        } 
         res.json(staff);
    });

   
};