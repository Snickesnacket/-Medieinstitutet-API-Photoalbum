/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { login, register, refresh } from '../controllers/user_controller'
import user from "./users"
const router = express.Router()

/**
 * POST /register
 */
router.post('/register', [], register)
/**
 * POST /login
 */
router.post('/login', [], login)
/**
 * POST /refresh token
 */
router.post('/refresh', [], refresh)


export default router
