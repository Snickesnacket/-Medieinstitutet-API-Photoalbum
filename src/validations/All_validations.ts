import { body } from 'express-validator'


export const PostPhoto = [
    body('title').isString().isLength({ min: 3 }),
    body('url').isString(),
    body('comment').isString().isLength({ min: 3 })
]

export const PatchPhoto = [
    body('title').optional().isString().isLength({ min: 3 }),
    body('url').optional().isString(),
    body('comment').optional().isString().isLength({ min: 3 }),
];

export const postAlbums = [
    body('title').isString().isLength({ min: 3 }).withMessage({ message: "Title is required" }),
]

export const patchAlbum = [
    body('title').exists().isLength({ min: 3 }).withMessage({ message: "Could not find album" }),
]

export const addPhototoAlbum = [
    body('photo_id').exists().isInt().withMessage({ message: "PhotoId is not integer" }),
]

export const postToAlbumsPhotos = [
    body('photo_id').exists().isInt().withMessage({ message: "PhotoId is not integer" }),
]

