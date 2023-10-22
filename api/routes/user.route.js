import express from 'express'
import { login, signup, user } from '../controllers/user.controllers.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/signup", signup)
router.post('/login', login)
router.get("/user", verifyToken, user)

export default router