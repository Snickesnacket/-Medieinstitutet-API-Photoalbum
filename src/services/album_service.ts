import prisma from '../prisma'
import { AlbumPhotoDelete } from '../types'

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
}


export async function connectPhotosToAlbum(userId: number, albumId: number, photo_id: number[]) {

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
	return prisma.album.update({// destoy/ delete/remove
		where: {
			id: albumId,
		},
		data: {
			photos: {
				connect: photo_id.map((photoId) => ({ id: photoId })),// disconnect
			},
		},
	});
}

export const removePhotoFromAlbum = async (userId: number, albumId: number, photoId: number,) => {

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

	if (album.user_id !== userId) {
		throw new Error(`User with ID ${userId} is not authorized to add photo to album with ID ${albumId}`);
	}

	return await prisma.album.update({
        where: { id: albumId },
        data: {
            photos: {
                disconnect: { id: photoId }
            }
        }
    })

}


export const removeAlbum = async (userId: number, albumId: number) => {

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

	if (album.user_id !== userId) {
		throw new Error(`User with ID ${userId} is not authorized to add photo to album with ID ${albumId}`);
	}

	return await prisma.album.delete({
		where: {
			id: albumId,
		},
	});
}