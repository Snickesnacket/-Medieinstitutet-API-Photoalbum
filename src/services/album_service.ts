import prisma from '../prisma'
import Debug from 'debug'
import { updateAlbumData } from '../types'

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

/**
 * Update Album
 */
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



export async function connectPhotosToAlbum(albumId: number, photo_id: number[]) {
	return prisma.album.update({
		where: {
			id: albumId,
		},
		data: {
			photos: {
				connect: photo_id.map((photoId) => ({ id: photoId })),
			},
		},
	});
}