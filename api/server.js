import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import propertyRouter from './routes/propeties.route.js'
import userRouter from './routes/user.route.js'

dotenv.config()

const server = express()

server.use(express.json())

mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Connected MongoDB")
}).catch((error) => {
    console.log("MongoDB Connecting Error:", error)
})

server.use("/api/auth", userRouter)
server.use("/api/properties", propertyRouter)

export default server