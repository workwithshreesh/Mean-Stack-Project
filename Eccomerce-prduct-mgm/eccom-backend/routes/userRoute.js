const express = require("express");
const User = require("../controller/user-controller");

const router = express.Router();

router.post("/register", User.createNewUser);
router.post("/login",User.loginUser);

module.exports = router;