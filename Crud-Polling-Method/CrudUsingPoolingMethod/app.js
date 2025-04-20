const express = require("express");
const appConfig = require("./config/app.config");
const dbConfig = require("./config/db.config");
const Categoryrouter = require("./route/categoryRoute")
const Productrouter = require("./route/productRoute");
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  };
  
  app.use(cors(corsOptions));

app.use(express.json())
app.use("/category",Categoryrouter);
app.use("/product",Productrouter);

async function startServer(){
    try{

        app.listen(appConfig.APP_PORT, ()=>console.log("Server is started...."+appConfig.APP_PORT));

    } catch (error){

        console.log(error, "error happens in server");

    }
}

startServer()