const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config()

const socLogger = async () => {
    try {

       await mongoose.connect(process.env.URI_MONGOOSE);

    } catch (error) {
        process.exit('mongo db failed');
    }
}


module.exports = socLogger;