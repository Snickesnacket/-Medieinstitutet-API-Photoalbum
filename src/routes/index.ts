import express from "express"
import profile from './profile'
import albums from './albums'
import photos from './photos'
import unsers from './users'
import { login, refresh, register } from '../controllers/user_controller'
import { validateToken } from '../middlewares/auth/jwt'
import { createUserRules } from '../validations/user_rules'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

/**
 * /authors
 */
router.use('/photos', photos)

/**
 * /books
 */
router.use('/albums', albums)

/**
 * /profile
 */
router.use('/profile', validateToken, profile)


/**
 * POST /login
 */
router.post('/login', login)

/**
 * POST /refresh
 */
router.post('/refresh', refresh)

/**
 * POST /register
 */
router.post('/register', createUserRules, register)

export default router
