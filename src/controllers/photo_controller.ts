import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getPhotos, getPhoto, createPhoto } from '../services/photo_services'
import prisma from '../prisma'


// Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛')

/**
 * Get all resources
 */
export const photoIndex = async (req: Request, res: Response) => {
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
export const photoShow = async (req: Request, res: Response) => {
    const photoId = Number(req.params.photoId)

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.photoId) }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
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

export const photoStore = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            message: validationErrors.array(),
        })
    }

    try {
        const photo = await createPhoto(req.token!.sub, req.body.title, req.body.url, req.body.comment)

        return res.status(201).json({
            status: "success",
            data: photo,
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
/**
 * Update a resource
 */
export const photoUpdate = async (req: Request, res: Response) => {

    const user = await prisma.user.findUnique({
        where: { id: Number(req.params.userId) }
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
}

/**
 * Delete a resource
 */
export const destroy = async (req: Request, res: Response) => {
}
