const userModel = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


async function registerController(req, res) {
    const {username, email, password, bio, profile_image} = req.body;

    const isUserAlreadyExist = await userModel.findOne(
        {
            $or: [ { username }, { email } ]
        }
    )
    if(isUserAlreadyExist){
        return res.status(409).json(
            {
                message: "user already exist with this " + (isUserAlreadyExist.email == email ? "email" : "Username")  
            }
        )
    }    
    
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        bio,
        profile_image,
        password: hash
        
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token);

    res.status(201).json({
        message: "User register successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profile_image
        }
    })
}


async function loginController(req, res) {
    const {username, email, password} = req.body;

    const user = await userModel.findOne(
        {
            $or: [ 
                { 
                    username: username
                },
                {
                    email: email
                } 
            ]
        }
    ) 
    if(!user){
        return res.status(404).json({
            message: "user not found"
        });
    }  
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message: "invalid password"
        });
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "login successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profile_image
        }
    })
}

module.exports = {
    registerController,
    loginController
}