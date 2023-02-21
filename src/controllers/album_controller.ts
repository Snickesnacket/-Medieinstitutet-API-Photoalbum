/**
 * Album Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createAlbum, getAlbum, getAlbums, updateAlbum } from '../services/album_service'
import prisma from '../prisma'
import { fail } from 'assert'


// Create a new debug instance
const debug = Debug('PHOTOALBUM:album_controller')

/**
 * Get all albums
 */
export const index = async (req: Request, res: Response) => {

	try {

		const albums = await getAlbums()

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
export const show = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId)

	try {
		const album = await getAlbum(albumId)

		res.send({
			status: "success",
			data: album,
		})

	} catch (err) {
		debug("Error thrown when finding book with id %o: %o", req.params.albumId, err)
		return res.status(404).send({ status: "error", message: "Not found" })
	}
}

/**
 * Create a album
 */

export const storeAlbum = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)

	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			message: validationErrors.array(),
		})
	}
	const validatedData = matchedData(req)

	try {
		const album = await createAlbum(req.token!.sub, req.body.title)

		return res.status(201).json({
			status: "success",
			data: album,
		})
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: 'Internal server error' })
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

	const albumId = Number(req.params.albumId)

	try {
		console.log("this is req.body.photo_id", req.body.photo_id, albumId)
		const result = await prisma.album.update({
			where: {
				id: albumId
			},
			data: {
				photos: {
					connect: {
						id: req.body.photo_id,
					}
				}
			},

		})
		res.status(201).send(result)

	} catch (err) {
		debug("Error thrown when creating a album %o: %o", req.body, err)
		console.error(err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}

}


/**
 * Patch albums/ albumsId
 */

export const update = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}
	const validatedData = matchedData(req)
	const albumsId = Number(req.params.albumsId)

	try {
		const userData = await updateAlbum(req.token!.sub, validatedData)

		res.send({ status: "success", data: userData })

	} catch (err) {
		return res.status(500).send({ message: "Something went wrong" })
	}
}

