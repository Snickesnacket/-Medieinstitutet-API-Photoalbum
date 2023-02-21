
import prisma from '../prisma'
import { CreateAlbumData, createPhototoAlbumData, updateAlbumData } from "../types"
import { Request, Response } from 'express'
import { userInfo } from 'os'
import { JwtPayload } from '../types'
import { validateToken } from "../middlewares/auth/jwt"
import Debug from 'debug'

const debug = Debug('PHOTOALBUM:album_services')
/**
 * Get all albums
 */

export const getAlbums = async (userId: number) => {

	return await prisma.album.findMany({
		where: {
			user_id: userId
		},
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
export const getAlbum = async (albumId: number, userId: number) => {
	return await prisma.album.findFirst({
		where: {
			id: albumId,
			user_id: userId

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
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	})

	if (!user) {
		throw new Error(`User with ID ${userId} not found`)
	}

	return await prisma.album.create({
		data: {
			title,
			user: {
				connect: {
					id: user.id,
				},
			},
		},
	})
}

export const updateAlbum = async (albumId: number, userId: number, userData: updateAlbumData) => {
	return await prisma.album.update({
		where: {
			id: albumId,
		},
		data: {
			...userData,
			user: {
				connect: { id: userId }
			}
		}
	})
}



