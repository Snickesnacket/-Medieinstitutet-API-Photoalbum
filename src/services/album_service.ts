import prisma from '../prisma'
import Debug from 'debug'
import { updateAlbumData } from '../types'
import { JwtPayload } from '../types'
import { Request, Response } from 'express'
import { title } from 'process'

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
export const getAlbum = async (userId: number, albumId: number) => {

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

	return await prisma.album.create({
		data: {
			title,
			user: {
				connect: {
					id: userId,
				},
			},
		},
	})
}

/**
 * Update Album
 */
export const updateAlbum = async (albumId: number, userId: number, title: string) => {
	console.log("tjosan från mig")
	const album = await prisma.album.findUnique({
		where: {
			id: albumId,
		},
		include: {
			user: true,
		},
	});

	if (!album) {
		throw new Error(`Album with ID ${albumId} not found`);
	}
	console.log(album.user_id, userId)
	if (album.user_id !== userId) {
		throw new Error(`User with ID ${userId} is not authorized to add photo to album with ID ${albumId}`);
	}

	return await prisma.album.update({
		where: {
			id: albumId,
		},
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

export const addOnePhoto = async (userId: number, albumId: number, photo_id: number) => {
	console.log("tjosan från mig")
	const album = await prisma.album.findUnique({
		where: {
			id: albumId,
		},
		include: {
			user: true,
		},
	});

	if (!album) {
		throw new Error(`Album with ID ${albumId} not found`);
	}
	console.log(album.user_id, userId)
	if (album.user_id !== userId) {
		throw new Error(`User with ID ${userId} is not authorized to add photo to album with ID ${albumId}`);
	}

	return await prisma.album.update({
		where: {
			id: albumId,
		},
		data: {
			photos: {
				connect: {
					id: photo_id,
				},
			},
		},
	});
};







export async function connectPhotosToAlbum(userId: number, albumId: number, photo_id: number[]) {

	console.log("tjosan från mig")
	const album = await prisma.album.findUnique({
		where: {
			id: albumId,
		},
		include: {
			user: true,
		},
	});

	if (!album) {
		throw new Error(`Album with ID ${albumId} not found`);
	}
	console.log(album.user_id, userId)
	if (album.user_id !== userId) {
		throw new Error(`User with ID ${userId} is not authorized to add photo to album with ID ${albumId}`);
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