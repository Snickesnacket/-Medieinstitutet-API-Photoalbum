import prisma from "../prisma"
import { CreatePhotoData } from "../types"

/**
 * Create a user
 *
 * @param photo User Details
 */
export const createPhoto = async (data: CreatePhotoData) => {
    return await prisma.photo.create({
        data: data,
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
        },
    })
}

