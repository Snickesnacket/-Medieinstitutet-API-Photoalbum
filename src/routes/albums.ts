import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, } from '../controllers/album_controller'
import user from "./User"
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
