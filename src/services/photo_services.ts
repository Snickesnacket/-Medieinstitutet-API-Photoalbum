import prisma from "../prisma"
import { UpdatePhotoData } from "../types"

/**
 * Get all photos
 */
export const getPhotos = async (userId: number) => {
    return await prisma.photo.findMany({
        where: {
            user_id: userId
        },
        select: {
            id: true,
            title: true,
            url: true,
            comment: true
        }
    });
};

/**
 * Get a photo
 */
export const getPhoto = async (photoId: number, userId: number) => {
    return await prisma.photo.findFirst({
        where: {
            id: photoId,
            user_id: userId
        },
        select: {
            id: true,
            title: true,
            url: true,
            comment: true,
        }
    })
}

/**
 * Create a photo
 */
export const createPhoto = async (userId: number, title: string, url: string, comment?: string,) => {

    return await prisma.photo.create({
        data: {
            title: title,
            url: url,
            comment,
            user: {
                connect: {
                    id: userId,
                }
            }
        }
    });
};

/**
 * Update a photo
 */
export const updatePhoto = async (photoId: number, userId: number, userData: UpdatePhotoData) => {

    const photo = await prisma.photo.findUnique({
        where: {
            id: photoId,
        },
        include: {
            user: true,
        },
    });

    if (!photo) {
        throw new Error(`Photo with ID ${photoId} not found`);
    }
    if (photo.user_id !== userId) {
        throw new Error(`User with ID ${userId} is not authorized to update photo ${photoId}`);
    }

    return await prisma.photo.update({
        where: {
            id: photoId,
        },
        data: {
            ...userData,
            user: {
                connect: { id: userId }
            }
        }
    })
}


export const removePhoto = async (userId: number, photoId: number) => {
    const photo = await prisma.photo.findUnique({
        where: {
            id: photoId,
        },
        include: {
            user: true,
        },
    });

    if (!photo) {
        throw new Error(`Photo with ID ${photoId} not found`);
    }

    if (photo.user_id !== userId) {
        throw new Error(`User with ID ${userId} is not authorized to add photo to album with ID ${photoId}`);
    }

    return await prisma.photo.delete({
        where: {
            id: photoId,
        },
    });
}