import express from 'express'
import { addphoto, albumIndex, albumPostMany, albumShow, albumStore, albumUpdate } from '../controllers/album_controller'
import { addPhototoAlbum, patchAlbum, postAlbums, postToAlbumsPhotos } from '../validations/All_validations'
const router = express.Router()

/**
 * GET /users albums
 */

router.get('/',
    albumIndex
)
/**
 * POST /users albums
 */

router.post('/',
    postAlbums,
    albumStore
)

/**
 * PATCH /post a new album
 */
router.patch('/:albumId',
    patchAlbum,
    albumUpdate),

    /**
     * GET /users album
     */

    router.get('/:albumId',
        albumShow,
    )

/**
 * POST / ADD A PHOTO TO AN ALBUM 
 */
router.post('/:albumId/photo',
    addPhototoAlbum,
    addphoto,
);

// VG 
/**
 * POST A PHOTO TO AN ALBUM
 */
router.post('/:albumId/photos',
    postToAlbumsPhotos,
    albumPostMany)

export default router
