import express from "express"
import albums from './albums'
import photos from './photos'
import { login, refresh, register } from '../controllers/user_controller'
import { validateToken } from '../middlewares/auth/jwt'
import { registerUserRules, loginUserRules } from '../validations/user_rules'




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
 * /photos
 */
router.use('/photos', validateToken, photos)

/**
 * /albums
 */
router.use('/albums', validateToken, albums)

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
router.post('/refresh', refresh)

/**
 * POST /register
 */
router.post('/register', registerUserRules, register)

export default router
