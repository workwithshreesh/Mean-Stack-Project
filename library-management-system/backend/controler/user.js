const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const HandleRegister = async (req,res) =>{
    try{

        const {username, fullName, password, email} = req.body;

        if(!username, !fullName, !password, !email){
            return res.status(404).json({message:"Bad Request"});
        }

        const user = await User.findOne({username});
        const userEmail = await User.findOne({email});

        if(user || userEmail){
            return res.status(200).json({message:"User is already registered"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            fullName,
            password:hashPassword
        });

        if(!newUser){
            return res.status(404).json({message:"Bad Request user not created"});
        }

        await newUser.save();
        return res.status(404).json({message:newUser});

    }catch (error){
        console.log(error, "error in register");
        throw error;
    }
}



const HandleLogin = async (req,res) => {
    try{

        const {username, password} = req.body;

        if(!username || !password){
            return res.status(404).json({message:"Bad request"});
        }

        const user = await User.findOne({username});
        
        if(!user){
            return res.status(401).json({message:"User is not register"});
        }
        
        if (!user.password) {
            return res.status(500).json({ message: "Password missing from database" });
        }
        

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({message:"password is not matched.."});
        }

        JWT_SECRET = "librarymgm"

        const token = jwt.sign({"userId":user._id}, JWT_SECRET,{expiresIn: "1h"});

        return res.status(200).json({message:token});

    } catch (error){
        console.log(error,"error in login system");
        throw error;
    }
}


module.exports = {
    HandleLogin,
    HandleRegister
}