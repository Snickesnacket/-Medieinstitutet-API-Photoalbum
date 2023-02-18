import express from "express"
import users from './users'
import { validateToken } from '../middlewares/auth/jwt'
import { registerUserRules, loginUserRules } from '../validations/user_rules'
import { register, login, } from '../controllers/user_controller'



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
 * /user
 */
router.use('/users', validateToken, users);

/**
 * POST /login
 */
router.post('/login', loginUserRules, login)

/**
 * POST /register
 */
router.post('/register', registerUserRules, register)

/**
 * POST /refresh
 */
//router.post('/refresh', refresh)

/**
 * /photos
 */
//router.use('/photos',  photos)

export default router
