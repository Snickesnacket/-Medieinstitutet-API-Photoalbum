import express from "express"
import users from './users'
import { validateToken, validateUser } from '../middlewares/auth/jwt'
import { registerUserRules, loginUserRules } from '../validations/user_rules'
import { register, login, } from '../controllers/user_controller'
import { addphoto, index, show, storeAlbum, update } from "../controllers/album_controller"
import { getUserById } from "../services/user_service"
import { createPhotosToAlbumRules } from "../validations/album_rules"
import { photoIndex, photoShow, photoStore, photoUpdate } from "../controllers/photo_controller"
import { body } from 'express-validator';
import { Request, Response } from 'express'
import { PatchPhoto } from "../validations/All_validations"




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
 * GET /users photos 
 */
router.get('/photos',
	validateToken,
	validateUser,
	photoIndex)

/**
 * GET /users photos
 */

router.get('/photos/:photoId', validateToken,
	validateUser,
	[
		body('photo_id').exists().isInt().withMessage({ message: "PhotoId is not integer" }),
	],
	photoShow)

/**
 * POST /post a new photo
 */
router.post('/photos',
	validateToken,
	validateUser,
	[
		body('title').isString().isLength({ min: 3 }),
		body('url').isString(),
		body('comment').isString().isLength({ min: 3 })
	],
	photoStore)

/**
 * PATCH/photos/:photoId
 */
router.patch('/photos/:photoId',
	validateToken,
	validateUser,
	PatchPhoto,
	photoUpdate);



/**
 * POST /users albums
 */
router.post('/albums',
	validateToken,
	validateUser,
	[
		body('title').isString().isLength({ min: 3 }).withMessage({ message: "Title is required" }),
	],
	storeAlbum,
);


/**
 * GET /users albums
 */
router.get('/albums',
	validateToken,
	validateUser,
	index,
)

/**
 * PATCH /post a new album
 */
router.patch('/albums/:albumId',
	validateToken,
	validateUser,
	[
		body('title').exists().isLength({ min: 3 }).withMessage({ message: "Could not find album" }),
	],
	update)

/**
 * GET /users album
 */

router.get('/albums/:albumId',
	validateToken,
	validateUser,
	show,
)
/**
 * POST / ADD A PHOTO TO AN ALBUM 
 */
router.post('/albums/:albumId/photo',
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
/* export const validateUser = (req: Request, res: Response, next: NextFunction) => {
	console.log("valideras som anv'ndare ")
	// Get user ID from URL params
	const userId = req.params.userId;
	console.log(userId)

	// Compare user ID in token with user ID in URL params
	if (!req.token || req.token.sub !== Number(userId)) {
		console.log(req.token, userId)
		return res.status(403).json({ error: "Forbidden: User not authorized" });

	}

	next();
}; */