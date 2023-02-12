import { Request, Response } from 'express'
import prisma from '../prisma'


/**
 * register new user 
 */
export const register = async (req: Request, res: Response) => {
    // validate incoming data 
    // calculate a hash plus salt for password 
    // store user in the database 
    // responde with 201 Created and status success
}

