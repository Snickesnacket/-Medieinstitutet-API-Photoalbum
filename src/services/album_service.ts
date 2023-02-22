import prisma from '../prisma'
import Debug from 'debug'
import { createPhototoAlbumData, updateAlbumData } from '../types'
import { albumIndex } from '../controllers/album_controller'

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

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	})

	if (!user) {
		throw new Error(`User with ID ${userId} not found`)
	}
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

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	})

	if (!user) {
		throw new Error(`User with ID ${userId} not found`)
	}

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

export const addOnePhoto = async (userId: number, albumId: number, photo_id: number) => {

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	})

	if (!user) {
		throw new Error(`User with ID ${userId} not found`)
	}

	return await prisma.album.update({

		where: {
			id: albumId
		},
		data: {
			photos: {
				connect: {
					id: photo_id,
				},
			},
		},
	})
}



export async function connectPhotosToAlbum(userId: number, albumId: number, photo_id: number[]) {

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	})

	if (!user) {
		throw new Error(`User with ID ${userId} not found`)
	}
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

/* export const removePhoto = async (userId: number, albumId: number, photoId: number) => {

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	})

	if (!user) {
		throw new Error(`User with ID ${userId} not found`)
	}
	return
	await prisma.photo.delete({
		where: {
			id: photoId,
		},
	});
	await prisma.album.update({
		where: {
			id: albumId,
		},
		data: {
			_count: {
				decrement: {
					photos: 1,
				},
			},
		},
	}) 
} */