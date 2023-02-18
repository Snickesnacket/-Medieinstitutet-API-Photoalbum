import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, } from '../controllers/photo_controller'
import { createPhotoRules, updatePhotoRules } from '../validations/photo_rules'
const router = express.Router()

/**
 * GET /users photos from album
 */
router.get('/:userId/photos', index)

/**
 * GET /users photo from album
 */

router.get('/:userId/photos/:photoId', show)

/**
 * POST /post a new photo to an album
 */
router.post('/:userId/albums/:albumId/photos', createPhotoRules, store)

/**
 * PATCH /resource/:resourceId
 */
router.patch('/:userId/albums/:albumId/photos/:photoId', updatePhotoRules, update)


export default router
