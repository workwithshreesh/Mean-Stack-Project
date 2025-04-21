const { User } = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config()

// create a new user
exports.createNewUser = async (req, res) => {
    try {

        const { name, email, password, role} = req.body;
        if(!name || !email || !password){
            return res.status(404).json({message:"All fields are quired"})
        }

        const existingUser = await User.findOne({
            where: { email:email }
        });

        if(existingUser){
            return res.status(200).json({message:"User is alredy exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        return res.status(200).json(newUser);
        
    } catch (error) {
        console.error("Error in creating a user", error);
        return res.status(200).json({error: "An error occured while creating user."})
    }
}


// user login
exports.loginUser = async (req, res) => {
    try {
      const { email, password, role } = req.body;

      if (!email || !password || !role) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const existingUser = await User.findOne({
        where: { email }
      });

      console.log(existingUser)
  
      if (!existingUser) {
        return res.status(404).json({ message: "User not found." });
      }
  
      if (existingUser.role !== role) {
        return res.status(403).json({ message: "Access denied. Role mismatch." });
      }
  
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password." });
      }
  
      const JWT_SECRET = process.env.JWT_SECRET;
  
      const token = jwt.sign(
        {
          userId: existingUser.id,
          role: existingUser.role,
          email: existingUser.email
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      return res.status(200).json(

         {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          token: token
        }
      );
  
    } catch (error) {
      console.error("Error in login user:", error);
      return res.status(500).json({ error: "An error occurred while logging in." });
    }
  };
  



