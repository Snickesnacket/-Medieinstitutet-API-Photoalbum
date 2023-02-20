import express from "express"
import users from './users'
import { validateToken, validateUser } from '../middlewares/auth/jwt'
import { registerUserRules, loginUserRules } from '../validations/user_rules'
import { register, login, } from '../controllers/user_controller'
import { body } from "express-validator"
import { createAlbum } from "../services/album_service"
import { addphoto, index, show, store, update } from "../controllers/album_controller"
import { getUserById } from "../services/user_service"
import { createPhotosToAlbumRules } from "../validations/album_rules"


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
		body('title').isString().isLength({ min: 3 }).withMessage({ message: "Title is required" }),
	],
	store,
);

router.get('/users/:userId/albums',
	validateToken,
	validateUser,
	index,
)

router.patch('/users/:userId/albums/:albumId',
	validateToken,
	validateUser,
	[
		body('albumId').exists().withMessage({ message: "Could not find album" }),
	],
	update)


router.get('/users/:userId/albums/:albumId',
	validateToken,
	validateUser,
	show,
)

router.post('/users/:userId/albums/:albumId/photo',
	validateToken,
	validateUser,
	[
		body('photo_id').exists().isInt().withMessage({ message: "PhotoId is not integer" }),
	],
	addphoto,
);
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
