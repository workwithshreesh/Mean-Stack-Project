const mongoose = require("mongoose");

async function connMongoose(url){
    return mongoose.connect(url);
}

module.exports = {
    connMongoose
}