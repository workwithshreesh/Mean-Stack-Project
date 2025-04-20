const express = require("express");
const {HandleLogin,
    HandleRegister} = require("../controler/user");


const Router = express.Router();

Router.post("/register",HandleRegister);
Router.post("/login",HandleLogin);


module.exports = Router