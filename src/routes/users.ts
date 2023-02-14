/**
 * Profile Router
 */
import express from 'express'
import { validateToken } from '../middlewares/auth/jwt'
import albums from './albums'
import photos from './photos'
const router = express.Router()



/**
 * /photos
 */
router.use('/photos', validateToken, photos)

/**
 * /albums
 */
router.use('/albums', validateToken, albums)



export default router
