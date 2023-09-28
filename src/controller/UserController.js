const User = require('../models/UserModel');
const { hashPassword, comparePassword } = require('../helper/hash');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.json({
            message: "Signup success! Please signin.",
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
}

exports.signIn = async (req, res) => {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please signup.",
            });
            const match = await comparePassword(password, user.password);
            if (!match) {
                return res.status(400).json({
                    error: "Incorrect password. Please try again.",
                });
            }
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    }
    catch(err){
        return res.status(401).json({
            error : err.message
        })
    }
}