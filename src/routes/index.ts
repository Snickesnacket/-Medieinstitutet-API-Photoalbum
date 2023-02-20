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
import { createPhotoRules, updatePhotoRules } from "../validations/photo_rules"
import { photoIndex, photoShow, photoStore, photoUpdate } from "../controllers/photo_controller"


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
 * GET /users photos from album
 */
router.get('/:userId/photos', validateToken,
	validateUser, photoIndex)

/**
 * GET /users photo from album
 */

router.get('/:userId/photos/:photoId', validateToken,
	validateUser, photoShow)

/**
 * POST /post a new photo to an album
 */
router.post('users/:userId/albums/:albumId/photos', validateToken,
	validateUser, createPhotoRules, photoStore)

/**
 * PATCH /resource/:resourceId
 */
router.patch('/users/:userId/albums/:albumId/photos/:photoId', validateToken,
	validateUser, updatePhotoRules, photoUpdate)






/**
 * POST /users albums
 */
router.post('/users/:userId/albums',
	validateToken,
	validateUser,
	[
		body('title').isString().isLength({ min: 3 }).withMessage({ message: "Title is required" }),
	],
	store,
);


/**
 * GET /users albums
 */
router.get('/users/:userId/albums',
	validateToken,
	validateUser,
	index,
)

/**
 * PATCH /post a new album
 */
router.patch('/users/:userId/albums/:albumId',
	validateToken,
	validateUser,
	[
		body('albumId').exists().withMessage({ message: "Could not find album" }),
	],
	update)

/**
 * GET /users album
 */

router.get('/users/:userId/albums/:albumId',
	validateToken,
	validateUser,
	show,
)
/**
 * POST / ADD A PHOTO TO AN ALBUM 
 */
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
