import express from "express"
import albums from './albums'
import photos from './photos'
import users from './users'
import profile from "./profile"
import { validateToken } from '../middlewares/auth/jwt'
import { registerUserRules, loginUserRules } from '../validations/user_rules'
import { register, login, refresh } from '../controllers/user_controller'



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
 * POST /register
 */
router.post('/register', registerUserRules, register)

/**
 * /profile
 */
router.use('/profile', validateToken, profile)

/**
 * POST /login
 */
router.post('/login', loginUserRules, login)

/**
 * POST /refresh
 */
//router.post('/refresh', refresh)

/**
 * /photos
 */
//router.use('/photos', validateToken, photos)

/**
 * /albums
 */
//router.use('/albums', validateToken, albums)








export default router
