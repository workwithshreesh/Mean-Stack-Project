const mongoose = require("mongoose");

const books = new mongoose.Schema({
    bookname:{
        type:String,
        required:true
    },
    bookAuthor:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps:true} 
);


const Books = mongoose.model("Books",books);

module.exports = Books