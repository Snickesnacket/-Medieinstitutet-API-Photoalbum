import { body } from 'express-validator'

export const createPhotoRules = [
    body('title').isString().isLength({ min: 3 }),
    body('url').isString(),
    body('comment').isString().isLength({ min: 3 })
]

export const updatePhotoRules = [
    body('title').isString().isLength({ min: 3 }),
    body('comment').isString().isLength({ min: 3 })
]