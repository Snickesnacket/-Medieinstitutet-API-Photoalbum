import { userInfo } from "os";
import prisma from "../prisma"
import { CreatePhotoData, UpdatePhotoData } from "../types"

/**
 * Create a user
 *
 * @param photo User Details
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
export const getPhotos = async () => {

    return await prisma.photo.findMany({
        select: {
            id: true,
            title: true,
            url: true,
            comment: true,
        }
    })
}

export const getPhoto = async (photoId: number) => {
    return await prisma.photo.findFirst({
        select: {
            id: true,
            title: true,
            url: true,
            comment: true
        }
    })

}

export const updatePhoto = async (photoId: number, userData: UpdatePhotoData) => {
    return await prisma.photo.update({
        where: {
            id: photoId,
        },
        data: userData
    })
}



/* export const createPhoto = async (data: CreatePhotoData) => {

    return await prisma.photo.create({
        data: {
            title: true, 
            url: true,
            comment: true, 
        }
        
    });
}; */