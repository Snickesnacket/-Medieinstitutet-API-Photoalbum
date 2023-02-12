/**
 * Album Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { createAlbum, getAlbum, getAlbums } from '../services/album_service'
import prisma from '../prisma'
import { title } from 'process'

// Create a new debug instance
const debug = Debug('prisma-books:album_controller')

/**
 * Get all albums
 */
export const index = async (req: Request, res: Response) => {
	try {
		const albums = await getAlbums()

		res.send({
			status: "success",
			data: albums,
		})

	} catch (err) {
		debug("Error thrown when finding books", err)
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
export const store = async (req: Request, res: Response) => {
	try {
		const album = await createAlbum({
			id: req.body.id,
			title: req.body.title,
			user: req.body.user,
			user_id: req.body.user_id
		})
		res.send({
			status: "success",
			data: album,
		})

	} catch (err) {
		debug("Error thrown when creating a album %o: %o", req.body, err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * add photo to album 
 */
export const addphoto = async (req: Request, res: Response) => {
	try {
		const result = await prisma.album.update({
			where: {
				id: Number(req.params.albumId),
			},
			data: {
				photos: {
					connect: {
						id: req.body.photosId,
					}
				}
			},
			include: {
				photos: true,
			}
		})
		res.send({
			status: "success",
			data: result,
		})
	} catch (err) {
		debug("Error thrown when creating a album %o: %o", req.body, err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}

}


/**
 * Patch albums/ albumsId
 */

export const update = async (req: Request, res: Response) => {
	const albumsId = Number(req.params.albumsId)

	try {
		const album = await prisma.album.update({
			where: {
				id: albumsId,
			},
			data:
				req.body,
		})
		return res.send(album)
	} catch (err) {
		return res.status(500).send({ message: "Something went wrong" })
	}
}

