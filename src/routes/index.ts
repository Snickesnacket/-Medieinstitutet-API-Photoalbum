import express from "express"
import { validateToken, validateUser } from '../middlewares/auth/jwt'
import { registerUserRules, loginUserRules } from '../validations/User_validations'
import { register, login, refresh } from '../controllers/user_controller'
import { addphoto, albumIndex, albumPostMany, albumShow, albumStore, albumUpdate } from "../controllers/album_controller"
import { photoIndex, photoShow, photoStore, photoUpdate } from "../controllers/photo_controller"
import { addPhototoAlbum, getUsersPhotos, patchAlbum, PatchPhoto, postAlbums, PostPhoto, postToAlbumsPhotos, } from "../validations/All_validations"





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
	photoIndex),

	/**
	 * GET /users photos
	 */

	router.get('/photos/:photoId',
		validateToken,
		validateUser,
		getUsersPhotos,
		photoShow),

	/**
	 * POST /post a new photo
	 */
	router.post('/photo',
		validateToken,
		validateUser,
		PostPhoto,
		photoStore),

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
	postAlbums,
	albumStore,
);


/**
 * GET /users albums
 */
router.get('/albums',
	validateToken,
	validateUser,
	albumIndex,
),

	/**
	 * PATCH /post a new album
	 */
	router.patch('/albums/:albumId',
		validateToken,
		validateUser,
		patchAlbum,
		albumUpdate),

	/**
	 * GET /users album
	 */

	router.get('/albums/:albumId',
		validateToken,
		validateUser,
		albumShow,
	)
/**
 * POST / ADD A PHOTO TO AN ALBUM 
 */
router.post('/albums/:albumId/photo',
	validateToken,
	validateUser,
	addPhototoAlbum,
	addphoto,
);

// VG 
/**
 * POST A PHOTO TO AN ALBUM
 */
router.post('/albums/:albumId/photos',
	validateToken,
	validateUser,
	postToAlbumsPhotos,
	albumPostMany),

	/**
	 * DELETE A PHOTO  OF AN ALBUM
	 */
	//router.delete('/albums/:albumId/photos',
	/* 	validateToken,
		validateUser,
		deletePhoto) */

	/**
	 * DELETE AN ALBUM
	 */
	/* router.delete('/albums/:albumId/',
		validateToken,
		validateUser,
		deleteAlbum) */

	/**
	 * DELETE A PHOTO 
	 */
	/* router.delete('/photos/:photoId/',
		validateToken,
		validateUser,
		deletePhoto) */


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
