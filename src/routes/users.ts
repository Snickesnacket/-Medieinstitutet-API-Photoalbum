/**
 * Profile Router
 */
import express from 'express'
import { validateUser, hejhej } from '../middlewares/auth/jwt'
import albums from './albums'
import photos from './photos'
const router = express.Router()


/**
 * /albums
 */
router.use('/users', hejhej, albums)

/**
 * /photos
 */
router.use('/photos', validateUser, photos)




export default router
