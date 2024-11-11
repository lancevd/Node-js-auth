import express from 'express'
import { forgot, login, logout, register, resend, reset, verify } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.post('/forgot-password', forgot)

router.post('/reset-password', reset)

router.post('/verify-email', verify)

router.post('/resend-verification-email', resend)


export default router;
