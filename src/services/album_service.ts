
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
 * @param userId number 
 * @param title string 
 */
export const createAlbum = async (userId: number, title: string) => {
	return await prisma.album.create({
		data: {
			title,
			user: {
				connect: {
					id: userId
				}
			}
		}
	})
}




export const createPhototoAlbum = async (data: createPhototoAlbumData, albumId: number) => {
	console.log("hello from create photo to album")
	return await prisma.album.update({
		where: {
			id: albumId
		},
		data: {
			photos: {
				connect: {
					id: Number(data.photo_id),
				}
			}
		},

	})
}