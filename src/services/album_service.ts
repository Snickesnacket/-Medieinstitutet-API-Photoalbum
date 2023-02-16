
import prisma from '../prisma'
import { CreateAlbumData } from "../types"
import { Request, Response } from 'express'
import { userInfo } from 'os'
import { JwtPayload } from '../types'
import { validateToken } from "../middlewares/auth/jwt"
/**
 * Get all albums
 */

export const getAlbums = async () => {

	return await prisma.album.findMany({
		select: {
			id: true,
			title: true,
			user_id: true,
		}
	})
}

/**
 * Get a single album
 *
 * @param albumId The id of the author to get
 */
export const getAlbum = async (albumId: number) => {
	return await prisma.album.findFirst({
		where: {
			id: albumId,

		},
		include: {
			photos: {
				select: {
					id: true,
					title: true,
					url: true,
					comment: true,
					user_id: true,

				}
			}
		}

	})
}

/**
 * Create a author
 *
 * @param data Author Details
 */
export const createAlbum = async (data: CreateAlbumData) => {
	const { title, userId } = data;

	return await prisma.album.create({
		data: {
			title,
			user: {
				connect: {
					id: userId
				}
			}
		}
	});
};