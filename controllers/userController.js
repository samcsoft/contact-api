const asynchandler = require('express-async-handler');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// @desc regiter a user
// @route POST /api/users/register
// @access public

const registerUser = asynchandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User email already exists."); 
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username, email, password:hashPassword});

    if(user){
        res.status(200).json({_id: user.id, email:email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json(user);
});

// @desc login a user
// @route POST /api/users/login
// @access public

const signInUser = asynchandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const user = await User.findOne({email});

    if(user && await bcrypt.compare(password, user.password))
    {
        const accessToken = jwt.sign(
            { 
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn:'10m'}
        );
        res.status(200).json({accessToken});        
    }else 
    {
        res.status(401);
        throw new Error("Error in credentials");
    }    
});

// @desc current user
// @route GET /api/users/current
// @access private

const currentUser = asynchandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {
    registerUser,
    signInUser,
    currentUser
};
