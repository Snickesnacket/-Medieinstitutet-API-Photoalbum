/**
 * User Service
 */
import prisma from '../prisma'
import { CreateUserData } from '../types'

/**
 * Get a user by email
 *
 * @param id of the user of the user to get
 */
export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		}
	})
}

export const getUserById = async (userId: number) => {
	return await prisma.user.findUnique({
		where: {
			id: userId
		}
	})
}

/**
 * Create a user. vad som skickas IN 
 *
 * @param data User Details
 */
export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({
		data: data,
	})
}


