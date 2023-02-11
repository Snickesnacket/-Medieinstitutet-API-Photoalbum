import express from "express"
import resource from './_router'
import userRouter from "./User"
import albumsRouter from "./albums"
import photosRouter from "./photos"


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

router.use('/users/:register', userRouter)
router.use('/users', Isauthenticated, userRouter)
router.use('/albums', Isauthenticated, albumsRouter)
router.use('/photos', Isauthenticated, photosRouter)

export default router
