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
