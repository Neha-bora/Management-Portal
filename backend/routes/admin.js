var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { allStaff, getUserById, removeStaff, updateStaff, getastaff, viewLeads} = require('../controllers/admin');
const { isAdmin, isSignedIn, isAuthenticated } = require('../controllers/auth');

router.param("staffId" ,getUserById );
router.param("userId" ,getUserById);


router.get("/getStaff" ,  allStaff )

router.get("/getaStaff/:staffId" ,getastaff );

router.get("/viewLead" ,viewLeads )

//delete
router.delete("/deleteStaff/:staffId/:userId", isSignedIn, isAuthenticated, isAdmin, removeStaff );

//update
router.put("/updateStaff/:staffId/:userId",[
    check("name" , "Name is required").not().isEmpty(),
    check("email" , "Email is required").isEmail(),
    check("password", "Should be required").not().isEmpty(),
], isSignedIn, isAuthenticated, isAdmin, updateStaff )



module.exports = router;