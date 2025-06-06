const express = require("express");
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const setupssoAlert = require('./redis/ssoAlertRedis');
const {connMongoose} = require("./conn");
const userAuth = require("./route/user");
const userBooks = require("./route/books");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
setupssoAlert(wss)
app.use(express.json());


const allowOrigin = "http://localhost:4200";
const corsOptions = {
    origin: allowOrigin,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credential: true
}

app.use(cors(corsOptions));
app.use("/auth",userAuth);
app.use("/books",userBooks);

async function startServer(){
    try{

        const PORT = 8000;
        const url = "mongodb://localhost:27017/library";
        await connMongoose(url).then(()=>console.log("Mongodb is conected.."));
        server.listen(PORT,()=>console.log("server is started"));

    }catch (error){
        console.log(error, "error in server")   ;                                                                                                                                                        
    }
}

startServer()