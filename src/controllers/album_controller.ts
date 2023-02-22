import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { JwtPayload } from '../types'
import { addOnePhoto, connectPhotosToAlbum, createAlbum, getAlbum, getAlbums, updateAlbum } from '../services/album_service'




// Create a new debug instance
const debug = Debug('PHOTOALBUM:album_controller')

/**
 * Get all albums
 */
export const albumIndex = async (req: Request, res: Response) => {

	try {
		const albums = await getAlbums(req.token!.sub)

		res.send({
			status: "success",
			data: albums
		})

	} catch (err) {
		debug("Error thrown when finding albums", err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Get a single album
 */
export const albumShow = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId)

	try {
		const album = await getAlbum(req.token!.sub, albumId)

		if (!album) {
			return res.status(400).send({ message: 'Album not found' });
		}

		res.send({
			status: "success",
			data: album,
		})

	} catch (err) {
		debug("Error thrown when finding album with id %o: %o", req.params.albumId, err)
		return res.status(404).send({ status: "error", message: "Album Not found" })
	}
}

/**
 * Create an album
 */
export const albumStore = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	console.log('hello! from albumStore')
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			message: validationErrors.array(),
		})
	}
	const validatedData = matchedData(req)

	try {

		const album = await createAlbum(req.token!.sub, validatedData.title)

		return res.status(200).send({
			status: "success",
			data: album,
		})
	} catch (err) {
		return res.status(400).send({ message: 'Internal server error' })
	}
}

/**
 * add photo to album 
 */
export const addphoto = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}



	const validatedData = matchedData(req)

	const albumId = Number(req.params.albumId)

	try {

		const album = await addOnePhoto(req.token!.sub, albumId, validatedData.photo_id);

		if (!album) {
			return res.status(400).send({ message: 'Album not found' });
		}

		res.status(200).send({
			status: "success",
			data: null,
		});

	} catch (err) {
		debug("Error thrown when creating a album %o: %o", req.body, err)
		console.error(err)

		res.status(400).send({ status: "error", message: "Something went wrong adding the photo to the album" })
	}
}
/**
 * Patch an album
 */
export const albumUpdate = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}
	const validatedData = matchedData(req)
	const albumId = Number(req.params.albumId)

	try {
		const userData = await updateAlbum(albumId, req.token!.sub, validatedData.title)

		res.send({ status: "success", data: userData })

	} catch (err) {
		return res.status(400).send({ message: "Something went wrong" })
	}
}

/**
 * Post a photo to an album 
*/
export const albumPostMany = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	const validatedData = matchedData(req)

	try {
		const albumId = Number(req.params.albumId);
		const photo_id = validatedData.photo_id;

		// Connect the photos to the album
		await connectPhotosToAlbum(req.token!.sub, albumId, photo_id);

		// Return the updated album data
		res.status(200).send({
			status: "success",
			data: null,
		});
	} catch (error) {
		res.status(400).send({
			status: "error",
			message: "Something went wrong",
		});
	}
}