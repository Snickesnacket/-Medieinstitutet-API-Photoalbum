import express from 'express'
import { index, show, store, addphoto } from '../controllers/_controller'
const router = express.Router()


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
router.post('/:userId/albums/', [], addphoto)

/**
 * POST /post a new album
 */
router.patch('/:userId/albums/albumId', [], store)

/**
 * PATCH /resource/:resourceId
 */
router.post('/:userId/albums/:albumId/photos', [], addphoto)


export default router
