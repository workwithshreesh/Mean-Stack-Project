const express = require("express");
const {HandleLogin,
    HandleRegister, HandleLogout} = require("../controler/user");


const Router = express.Router();

Router.post("/register",HandleRegister);
Router.post("/login",HandleLogin);
Router.post("/logout", HandleLogout)


module.exports = Router;