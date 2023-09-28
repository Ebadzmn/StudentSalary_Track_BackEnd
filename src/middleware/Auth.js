const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require('dotenv').config();

exports.requireSignin = async (req, res, next) => {
    try{
        const decoded =jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        let email = decoded.email;
        let id = decoded.id;

        req.headers.email = email;
        req.headers._id = id;
        next();
    }
    catch(err){
        return res.status(401).json({
            error : err.message
        })
    }
}

exports.isAdmin = async (req,res,next) => {
    try {
        const user = await User.findById(req.headers._id);
        if(user.role === "admin1"){
            next();
        }else{
            return res.status(401).json({message:"Admin resource. Access denied"})
        }
    } catch (error) {
        return res.status(401).json(error)
    }
}