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
    console.error()
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
