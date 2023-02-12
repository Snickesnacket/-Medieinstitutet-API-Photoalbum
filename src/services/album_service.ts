/**
 * Author Service
 */
import prisma from '../prisma'
import { CreateAlbumData } from "../types"

/**
 * Get all albums
 */
export const getAlbums = async () => {
	return await prisma.album.findMany()
}

/**
 * Get a single album
 *
 * @param albumId The id of the author to get
 */
export const getAlbum = async (albumId: number) => {
	return await prisma.album.findUniqueOrThrow({
		where: {
			id: user_id,
		},
		include: {
			photos: true,
		}
	})
}

/**
 * Create a album
 *
 * @param data Album Details
 */
export const createAlbum = async (data: CreateAlbumData) => {
	return await prisma.album.create({
		data: {
			id: id
		}
	})
}
