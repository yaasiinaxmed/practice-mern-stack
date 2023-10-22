import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const user = await User.findOne({email}) 

        if(user) {
            return res.status(409).json({status: 409, message: "User email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User(
            {
                name,
                email,
                password: hashedPassword
            }
        )

        await newUser.save()

        res.status(201).json({status: 201, message: "User created successfully"})

    } catch (error) {
        res.status(500).json({status: 500, message: "Internal Server Error", errorMessage: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email}) 

        if(!user) {
            return res.status(404).json({status: 404, message: "User not found"})
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)

        if(!isCorrectPassword) {
            return res.status(401).json({status: 401, message: "Password is not correct"})
        }

        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: '1h'})

        res.status(200).json({status: 200, message: "User logged in successfully", token})
        
    } catch (error) {
        res.status(500).json({status: 500, message: "Internal Server Error", errorMessage: error.message})
    }
}

export const user = async (req, res) => {
    console.log(req.user)
    try {
        const user = await User.findById(req.user._id).select("-password")
        res.json(user)
    } catch (error) {
        res.status(500).json({status: 500, message: "Internal Server Error", errorMessage: error.message})
    }
}