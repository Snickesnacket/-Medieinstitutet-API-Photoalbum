import express from 'express'
import { index, show, store, addphoto, update } from '../controllers/album_controller'
const router = express.Router()
import { createAlbumRules, updateAlbumRules, createPhotosToAlbumRules } from "../validations/album_rules"
import { createAlbum } from '../services/album_service'


/**
 * GET /users albums
 */
//router.get('/users/:userId/albums', index)

/**
 * GET /users album
 */

//router.get('/users/:userId/albums/:albumId', show)

/**
 * POST /post a new album
 */
router.post('/users/:userId', createAlbumRules, store);

/**
 * PATCH /post a new album
 */
//router.patch('/users/:userId/albums/:albumId', updateAlbumRules, update)

/**
 * POST / ADD A PHOTO TO AN ALBUM 
 */
//router.post('/users/:userId/albums/:albumId/photos', createPhotosToAlbumRules, addphoto)


export default router
