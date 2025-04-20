const express = require("express");
const {AddNewBook,
    UpdateBook,
    DeleteBook,
    GetAllBook,
    getBookById} = require("../controler/books");

const authenticateUser = require("../middlewares/authenticateUser");

const Router = express.Router();

Router.post("/book",authenticateUser,AddNewBook);
Router.put("/book/:id",authenticateUser,UpdateBook);
Router.delete("/book/:id",authenticateUser,DeleteBook);
Router.get("/book",GetAllBook);
Router.get("/book/:id",authenticateUser,getBookById);


module.exports = Router;