import express from "express"
import user from "./User"
import albums from "./albums"
import photos from "./photos"
import { register } from '../controllers/register_controller'
import { createUserRules } from '../validations/user_rules'


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

/**
 * register new user 
 * @todo validate incoming data and bail if validation fails
 */

router.post('/register', createUserRules, register)
router.use('/users', user)
router.use('/albums', albums)
router.use('/photos', photos)

export default router
