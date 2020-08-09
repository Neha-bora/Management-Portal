var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

const {  isSignedIn, isAuthenticated, isStaff } = require('../controllers/auth');
const { addLead, getLeadById, getAllLead, removeLead, updateLead, getalead, usefulUpdate } = require('../controllers/staff');
const { getUserById} = require('../controllers/admin');


router.param("leadId" ,getLeadById );
router.param("userId" ,getUserById );

//create
router.post("/AddLeads/:userId" ,[  
    check("name" , "Name should be requried").not().isEmpty(),
    check("email" , "Email should be required").isEmail(),

], isSignedIn , isAuthenticated , isStaff , addLead)

//delete
router.delete("/deleteLead/:leadId/:userId", isSignedIn, isAuthenticated, isStaff,removeLead );

router.get("/getLead/:userId" , getAllLead  );
router.get("/getaLead/:leadId" ,getalead );

//useful or not
router.post("/usefulLead/:leadId/:userId" , isSignedIn , isAuthenticated , isStaff ,usefulUpdate)

//update
router.put("/updateLead/:leadId/:userId",[
    check("name" , "Name is required").not().isEmpty(),
    check("email" , "Email is required").isEmail(),
], isSignedIn, isAuthenticated, isStaff,updateLead  )


module.exports = router;