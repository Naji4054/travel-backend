import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const authenticate = async( req, res, next) => {
    const token = req?.headers['authorization']?.split(' ')[1]
    console.log(token)

    if(!token) {
        res.status(401).json({
            status: false,
            message: " token not found , please login!",
            data: null
        })
    }else {
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!decodedToken){
            res.status(401).json({
                status: false,
                message: "invalid token",
                data: null
            })
        }else {
            const userData = await User.findOne({email: decodedToken.email})
            if(!userData){
                res.status(401).json({
                    status: false,
                    message: "No such user found",
                    data: null
                })
            }else {
                req.userId= userData._id
                req.userRole= userData.role
                req.userEmail= userData.email
                next()
            }
        }
    }
}

export const authorize = (authorizedRole) =>{
    return (req, res, next) =>{
        const userRole= req.userRole
        const userId= req.userId
        console.log(userRole, 'user role')
        console.log(userId, 'user id')
        if( !userId || !userRole){
            res.status(401).json({
                status: false,
                message: " user not found",
                data: null
            })
        } else {
            const permission = authorizedRole.includes(userRole)
            if(!permission){
                res.status(401).json({
                    status: false,
                    message:  "unauthorized access",
                    data: null
                })
            } else {
                next()
            }
        }
    }
}