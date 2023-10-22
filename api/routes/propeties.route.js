import express from 'express'
import { createProperty, propeties } from '../controllers/properties.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.get("/", propeties)
router.post("/create_property", verifyToken, createProperty)

export default router