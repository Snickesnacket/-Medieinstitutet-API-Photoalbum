import { Request, Response } from 'express'
import prisma from '../prisma'
import { validationResult } from 'express-validator'


/**
 * register new user 
 * @todo validate incoming data and bail if validation fails

 */
export const register = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        })
    }
    
    res.status(201).send({
        status: "success",
        data: req.body
    })
}
    //validation errors
    // validate incoming data
    // calculate a hash plus salt for password
    // store user in the database

   
    // responde with 201 Created and status success


