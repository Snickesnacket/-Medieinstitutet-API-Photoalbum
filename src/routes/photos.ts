import express from 'express'
import { deletePhoto, photoIndex, photoShow, photoStore, photoUpdate } from '../controllers/photo_controller'
import { PatchPhoto, PostPhoto } from '../validations/All_validations'
const router = express.Router()

/**
     * GET /users photos
     */
router.get('/',
    photoIndex)

/**
 * GET /users photo
 */

router.get('/:photoId',
    photoShow)

/**
 * POST /post a new photo
 */
router.post('/',
    PostPhoto,
    photoStore)

/**
 * PATCH/photos/:photoId
 */
router.patch('/:photoId',
    PatchPhoto,
    photoUpdate)

/**
* DELETE A PHOTO 
*/
router.delete('/:photoId',
    deletePhoto)

export default router