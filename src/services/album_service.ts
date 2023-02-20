
import prisma from '../prisma'
import { CreateAlbumData, createPhototoAlbumData } from "../types"
import { Request, Response } from 'express'
import { userInfo } from 'os'
import { JwtPayload } from '../types'
import { validateToken } from "../middlewares/auth/jwt"
import Debug from 'debug'

const debug = Debug('PHOTOALBUM:album_services')
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
 * Create Album
 *
 * @param data album Details
 */
export const createAlbum = async (data: CreateAlbumData) => {
	console.log("hello form createAlbum")
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


export const createPhototoAlbum = async (data: createPhototoAlbumData, albumId: number, photo_id: number) => {
	console.log("hello from create photo to album")
	const { photo_id, albumId } = data;

	return await prisma.album.update({
		where: {
			id: albumId
		},
		data: {
			photos: {
				connect: {
					id: photo_id,
				}
			}
		},

	})
}