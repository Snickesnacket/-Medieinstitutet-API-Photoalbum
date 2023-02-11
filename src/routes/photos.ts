import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, } from '../controllers/photo_controller'
import user from "./User"
const router = express.Router()


/**
 * GET /users photos from album
 */
router.get('/:userId/albums/albumId/photos', index)

/**
 * GET /users photo from album
 */

router.get('/:userId/albums/albumId/photos/photoId', show)

/**
 * POST /post a new photo to an album 
 */
router.post('/:userId/albums/albumId/photos/photoId', [], store)

/**
 * PATCH /resource/:resourceId
 */
router.patch('/:userId/albums/:albumId/photos/photoId', [], update)


export default router
