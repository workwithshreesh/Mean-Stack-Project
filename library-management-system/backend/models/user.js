const mongoose = require("mongoose");

const userNew = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},
{timestamps:true}
);


const User = mongoose.model("User",userNew);

module.exports = User;
