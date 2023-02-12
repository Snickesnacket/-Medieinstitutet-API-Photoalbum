import express from 'express'
import { index, show, store } from '../controllers/_controller'
const router = express.Router()


/**
 * GET /users albums
 */
router.get('/:userId/album', index)

/**
 * GET /users album
 */

router.get('/:userId/albums/albumId', show)

/**
 * POST /post a new album
 */
router.post('/:userId/albums/albumId', [], store)

/**
 * PATCH /resource/:resourceId
 */
router.patch('/:userId/albums/:albumId', [], update)


export default router
