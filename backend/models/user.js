const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    salt: String,
    encry_password:{
        type:String,
        required:true
    },
     role: {
      type: Number,
      required:true
    
    }
})


userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;     // _password means password stored securely
    this.salt = uuid.v1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  autheticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};


module.exports = mongoose.model("User" , userSchema)