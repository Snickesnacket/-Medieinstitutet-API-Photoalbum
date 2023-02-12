import express from 'express'
import { index, show, store, update, addphoto } from '../controllers/album_controller'
const router = express.Router()
import { createAlbumRules, updateAlbumRules, createPhotosToAlbumRules } from "../validations/album_rules"


/**
 * GET /users albums
 */
router.get('/:userId/albums', index)

/**
 * GET /users album
 */

router.get('/:userId/albums/albumId', show)

/**
 * POST /post a new album
 */
router.post('/:userId/albums/', createAlbumRules, store)

/**
 * PATCH /post a new album
 */
router.patch('/:userId/albums/albumId', updateAlbumRules, update)

/**
 * POST / ADD A PHOTO TO AN ALBUM 
 */
router.post('/:userId/albums/:albumId/photos', createPhotosToAlbumRules, addphoto)


export default router
