const jwt = require("jsonwebtoken");


const SECRET_KEY = "librarymgm";


function authenticateUser(req,res,next){
    const token = req.header("Authorization");
    const actualToken = token.replace('Bearer ', '');

    if(!token){
        return res.status(404).json({message:"Access denied no token is provided"})
    }

    try{

        const decoded = jwt.verify(actualToken, SECRET_KEY);
        req.user = decoded;

        next();

    }catch (error){
        return res.status(404).json({message:"Error is in middleware."});
    }
}

module.exports = authenticateUser;