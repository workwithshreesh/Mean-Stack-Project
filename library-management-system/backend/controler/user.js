const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const HandleRegister = async (req,res) =>{
    try{

        const {username, fullName, password, email} = req.body;

        if(!username, !fullName, !password, !email){
            const error = new Error("Bad Request");
            error.statusCode = 500;
            throw error;
        }

        const user = await User.findOne({username});
        const userEmail = await User.findOne({email});

        if(user || userEmail){
            const error = new Error("Username or email already exists.");
            error.statusCode = 409 || 500;
            throw error;

        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            fullName,
            password:hashPassword
        });

        await newUser.save();

        // user without password
        const { password: _, ...userWithoutPassword } = newUser.toObject();

        return res.status(201).json({
            message:"User register successfully.",
            user: userWithoutPassword,
        });

    }catch (error){
        console.log(error.message, "error in register");
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message })
    }
}



const HandleLogin = async (req,res) => {
    try{

        const {username, password} = req.body;

        if(!username || !password){
            const error = new Error("All fields are required");
            error.statusCode = 409;
            throw error;
        }

        const user = await User.findOne({username});
        
        if(!user){
            const error = new Error("User is not register");
            error.statusCode = 409;
            throw error;
        }
        
        if (!user.password) {
            const error = new Error("Password missing from database");
            error.statusCode = 409;
            throw error;
        }
        

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            const error = new Error("Password is not matched..");
            error.statusCode = 409;
            throw error;
        }

        JWT_SECRET = "librarymgm"

        const token = jwt.sign({"userId":user._id}, JWT_SECRET,{expiresIn: "1h"});

        return res.status(200).json({token:token});

    } catch (error){
        console.error("Error in register:", error.message);

        // Default to 500 if no custom statusCode was set
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message });

    }
}


module.exports = {
    HandleLogin,
    HandleRegister
}