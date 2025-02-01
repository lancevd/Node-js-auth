import express from 'express'
import { CheckAuth, forgot, login, logout, register, resend, reset, verify, verifyEmail } from '../controllers/auth.controller.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

// router.get('/page', console.log("Hellow there"))

router.post('/register', register)

router.post('/verify-email', verifyEmail)

router.post('/login', login)

router.get('/check-auth', verifyToken, CheckAuth)

router.post('/logout', logout)

router.post('/forgot-password', forgot)

router.post('/reset-password/:token', reset)

router.post('/verify-email', verify)

router.post('/resend-verification-email', resend)


export default router;
