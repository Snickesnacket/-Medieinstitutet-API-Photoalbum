/**
 * Profile Router
 */
import express from 'express'
import { validateToken } from '../middlewares/auth/jwt'
import { getProfile } from '../controllers/user_controller'
import albums from './albums'
const router = express.Router()



/**
 * /photos
 */
//router.use('/photos', validateToken, photos)

/**
 * /albums
 */
router.use('/albums', albums)



export default router
