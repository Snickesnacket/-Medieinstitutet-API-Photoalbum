import express from "express"
import user from "./User"
import albums from "./albums"
import photos from "./photos"
import { body } from 'express-validator'
import { register } from '../controllers/register_controller'


// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

router.post('/register', register)
router.use('/users', user)
router.use('/albums', albums)
router.use('/photos', photos)

export default router
