import express from "express"
import users from './users'
import { validateToken, validateUser } from '../middlewares/auth/jwt'
import { registerUserRules, loginUserRules } from '../validations/user_rules'
import { register, login, } from '../controllers/user_controller'
import { body } from "express-validator"
import { createAlbum } from "../services/album_service"
import { index, show, store } from "../controllers/album_controller"
import { getUserById } from "../services/user_service"


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


/**
 * /user
 */
router.post('/users/:userId/albums',
	validateToken,
	validateUser,
	[
		body('title').isString().isLength({ min: 3 }),
	],
	store,
);

router.get('/users/:userId/albums',
	validateToken,
	validateUser,
	index,
)


router.get('/users/:userId/albums/:albumId',
	validateToken,
	validateUser,
	show,
)
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
