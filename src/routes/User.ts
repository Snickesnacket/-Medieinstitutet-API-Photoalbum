/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, destroy } from '../controllers/user_controller'
import user from "./User"
const router = express.Router()

/**
 * POST /register 
 */
router.post('/register', [], store)
/**
 * POST /login
 */
router.post('/login', [], store)
/**
 * POST /refresh token
 */
router.post('/refresh', [], store)


export default router