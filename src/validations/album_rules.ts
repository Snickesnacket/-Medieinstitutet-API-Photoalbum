import { body } from 'express-validator'



export const createAlbumRules = [
    body('title').isString().isLength({ min: 3 }),
]

export const updateAlbumRules = [
    body('albumId').isInt(),
    body('title').isString().isLength({ min: 3 })
]

export const createPhotosToAlbumRules = [
    body('photoId').exists().bail().isInt().withMessage({ message: "PhotoId is not integer" }),
]
