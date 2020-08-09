const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    staffId:{
        type:String,
        required:true
    },
    staffName:{
        type:String,
        required:true
    },
    useful:{
        type:Boolean,
        default: false
    }
    
})
module.exports = mongoose.model("Lead" ,leadSchema );