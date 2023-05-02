import express from "express"
import { validateToken, validateUser } from '../middlewares/auth/jwt'
import { registerUserRules, loginUserRules } from '../validations/User_validations'
import { register, login, refresh } from '../controllers/user_controller'
import albums from "./albums"
import photos from "./photos"

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOt",
	})
})

router.use('/albums', validateToken,
	validateUser, albums)

router.use('/photos', validateToken,
	validateUser, photos)

/**
 * POST /login
 */
router.post('/login', loginUserRules, login),

	/**
	 * POST /register
	 */
	router.post('/register', registerUserRules, register),

	/**
	 * POST /refresh
	 */
	router.post('/refresh', refresh)


export default router
