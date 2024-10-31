const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schmema = mongoose.Schema;
const userSchema = new Schmema({
    usename:{
        type: String,
        required: true,
        unique:true,
    },
    email:{
      type:String,
      required: true,
      unique:true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});


module.exports = mongoose.model("User", userSchema);    