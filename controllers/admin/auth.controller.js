import { validationResult } from "express-validator"
import User from "../../models/user.js"
import jwt from 'jsonwebtoken'


export  const login = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                message: "validation failed",
                data: null
            })
        }else {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user){
                res.status(404).json({
                    status: false,
                    message: "user with this email is not found ",
                    data: null
                })
            } else {
                const secretKey = process.env.JWT_SECRET_KEY
                const expiresIn = process.env.EXPIRES_IN    
                console.log(secretKey, expiresIn)
                const token  = jwt.sign({email , id: user._id}, secretKey, { expiresIn })
                res.status(200).json({
                    status: true,
                    message: "login successfull",
                    data:null,
                    token
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: "internal server error",
            data: null
        })
    }
}

export  const register = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                message: "validation failed",
                data: null
            })
        }else {

            
            const {firstName, lastName, email, password,role, status } = req.body
            const user = await User.findOne({email})
            if(user){
                res.status(400).json({
                    status: false,
                    message: "user already exists ",
                    errors: [
                        {
                            field: 'email',
                            message: 'User already exist'
                        }
                    ],
                    data: null
                })
            } else {
                const newUser = new User({
                    firstName ,
                    lastName,
                    email,
                    password,
                    status,
                    role
                })
                await newUser.save()

                const secretKey = process.env.JWT_SECRET_KEY
                const expiresIn = process.env.EXPIRES_IN    
                console.log(secretKey, expiresIn)
                const token  = jwt.sign({email ,id: newUser._id}, secretKey, { expiresIn })

                res.status(200).json({
                    status: true,
                    message: "registration successfull",
                    data:null,
                    token
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: "internal server error",
            data: null
        })
    }
}