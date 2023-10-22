import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const verifyToken = (req, res, next) => {

    const token = req.headers.authorization

    if(!token) {
        return res.status(401).json({status: 401, message: "You are  not authenticated!"})
    }

    console.log("token", token)

    const tokenWithoutBearar = token.split(" ")[1]

    jwt.verify(tokenWithoutBearar, process.env.SECRET_KEY, (error, user) => {
        if(error) {
            return res.status(401).json({status: 401, message: "Token is not valid!"})
        }

        req.user = user
        next()
    });
}