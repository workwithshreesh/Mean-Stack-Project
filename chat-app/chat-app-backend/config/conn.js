const mongoose = require('mongoose');


async function connection(url){
    await mongoose.connect(url)
}

module.exports = {
    connection
}