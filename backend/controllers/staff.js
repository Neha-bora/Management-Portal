const Lead = require("../models/lead");
const { check, validationResult } = require('express-validator');
const lead = require("../models/lead");

//Create leads
exports.addLead= (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty() ){
        return res.status(422).json({
            errors:errors.array()[0].msg
         
        })
 
    }
 
    let leadbody=req.body;
    leadbody['staffId']=req.params.userId
    leadbody['staffName']=req.profile.name

    const lead= new Lead(leadbody);
    // console.log(req.params.userId)


    lead.save((err, lead) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save lead in DB"
        });
      }
      res.json({ lead});
    });
  
  
};


  exports.getLeadById = (req , res   ,   next , id  ) => {
    Lead.findById(id).exec((err ,lead) => {
        //  console.log("LEAD" , lead)
        
       
        if(err ){
            return res.status(400).json({
 
              error:"No lead was found in DB"
            }); 
         }
         req.lead = lead;
             next();
     });
 };
 //All leads 
 exports.getAllLead = (req , res) =>{
  var userId=req.params.userId; 
  Lead.find({staffId:userId,useful:false}).exec( ( err , lead) =>{
   
    if(err){
        return res.status(400).json({
            error:"Not lead found"
        });
    }

    res.json(lead);
  });
};

//signle leads
exports.getalead = (req , res) =>{
   
  console.log("LEAD" , req.lead)
  return res.json(req.lead)
};

//delete
exports.removeLead = (req , res) =>{
  let leadId=req.params.leadId

  Lead.deleteOne({_id:leadId}, (err , lead) =>{ 
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

// lead useFul or not 
exports.usefulUpdate = ( req , res) =>{

  // var leadUpdate = req.body.useful
  console.log("useful")
  Lead.updateOne( {_id: req.params.leadId} , 

      { $set: { useful:true} },
      (err, lead) => {
          if(err){ 
                  return res.status(400).json({
                      error:"Failed to update "
                  });
                  }
               res.json(lead);
        
        }
        
)}

//update staff

exports.updateLead= ( req , res , leadId) =>{
  const errors = validationResult(req)
  if(!errors.isEmpty() ){
      return res.status(422).json({
          errors:errors.array()[0].msg
       
      })
  
  }
 

var id = req.params.leadId;
var updateName= req.body.name;
var updateEmail = req.body.email ;

Lead.updateOne(
  { _id: id },
  { $set: { name: updateName, email:updateEmail} },
  (err, lead) => {
      if (err){
                  return res.status(400).json({
                      error:"Failed to update todo"
                  });
              }
              res.json(lead);
    
    }
  
);
  


};