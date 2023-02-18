import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getPhotos, getPhoto } from '../services/photo_services'
import prisma from '../prisma'


// Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛')

/**
 * Get all resources
 */
export const index = async (req: Request, res: Response) => {
    try {
        const photos = await getPhotos()

        res.send({ // USES FINDMANY AND NOTHING MORE 
            status: "success",
            data: photos
        })

    } catch (err) {
        debug("Error thrown when finding photos", err)
        res.status(500).send({ status: "error", message: "Something went wrong" })
    }
}

/**
 * Get a single resource
 */
export const show = async (req: Request, res: Response) => {
    const photoId = Number(req.params.photoId)

    try {
        const photo = await getPhoto(photoId)

        res.send({
            status: "success",
            data: photo,
        })

    } catch (err) {
        debug("Error thrown when finding photo with id %o: %o", req.params.photoId, err)
        return res.status(404).send({ status: "error", message: "Not found" })
    }

}

/**
 * Create a resource
 */

export const store = async (req: Request, res: Response) => {

    const { title, url, comment, user_id, id, } = req.body;
    const userId = req.params.userId;


    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const photo = await prisma.photo.create({
            data: {
                title,
                url,
                comment,
                user_id,
                id
            }


        });

        return res.status(201).json(photo);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
/**
 * Update a resource
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a resource
 */
export const destroy = async (req: Request, res: Response) => {
}
