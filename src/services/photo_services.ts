import { userInfo } from "os";
import prisma from "../prisma"
import { CreatePhotoData, UpdatePhotoData } from "../types"

/**
 * Create a user
 *
 * @param photo User Details
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



export const updatePhoto = async (photoId: number, userId: number, userData: UpdatePhotoData) => {
    console.log("tjosan")
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
