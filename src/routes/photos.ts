import express from 'express'
import { photoIndex, photoShow, photoStore, photoUpdate } from '../controllers/photo_controller'
import { getUsersPhotos, PatchPhoto, PostPhoto } from '../validations/All_validations'
const router = express.Router()

/**
     * GET /users photos
     */
router.get('/',
    photoIndex),

    /**
     * GET /users photo
     */

    router.get('/:photoId',
        getUsersPhotos,
        photoShow),

    /**
     * POST /post a new photo
     */
    router.post('/',
        PostPhoto,
        photoStore),

    /**
     * PATCH/photos/:photoId
     */
    router.patch('/:photoId',
        PatchPhoto,
        photoUpdate);

export default router