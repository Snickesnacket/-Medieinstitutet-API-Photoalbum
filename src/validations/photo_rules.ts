import { body } from 'express-validator'

export const createAPhoto = [
    body('title').isString().isLength({ min: 3 }),
    body('url').isString(),
    body('comment').isString().isLength({ min: 3 })
]

export const updateAPhoto = [
    body('title').isString().isLength({ min: 3 }),
    body('url').isString(),
    body('comment').isString().isLength({ min: 3 })
]