import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { getPhotos, getPhoto, createPhoto, updatePhoto } from '../services/photo_services'

// Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛')

/**
 * Get all photos 
 */
export const photoIndex = async (req: Request, res: Response) => {
    try {
        const photos = await getPhotos(req.token!.sub)
        console.log("users id", req.token!.sub)

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
 * Get a photo
 */
export const photoShow = async (req: Request, res: Response) => {
    const photoId = Number(req.params.photoId)

    try {
        const photo = await getPhoto(photoId, req.token!.sub)

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

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
 * Create a photo
 */
export const photoStore = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            message: validationErrors.array(),
        });
    }

    const validatedData = matchedData(req)
    try {
        const photo = await createPhoto(req.token!.sub, validatedData.title, validatedData.url, validatedData.comment);

        return res.status(201).json({
            status: "success",
            data: photo,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Update a photo
 */
export const photoUpdate = async (req: Request, res: Response) => {
    // Check for any validation errors

    console.log('kommer vi hit?')
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        })
    }

    const validatedData = matchedData(req)
    const photoId = Number(req.params.photoId)
    console.log("validatedData", validatedData)

    try {
        const userData = await updatePhoto(photoId, req.token!.sub, {
            title: validatedData.title,
            url: validatedData.url,
            comment: validatedData.comment,
        })
        console.log("this is userData", userData)
        res.send({ status: "success", data: userData })

    } catch (err) {
        return res.status(500).send({ message: "Something went wrong" })
    }
}

/**
 * Delete a photo
 */
export const destroy = async (req: Request, res: Response) => {
}
