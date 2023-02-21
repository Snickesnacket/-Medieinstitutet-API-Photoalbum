import prisma from '../prisma'
import { CreateUserData } from '../types'

/**
 * Get a user by email
 */
export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		}
	})
}

/**
 * Get a user by id
 */
export const getUserById = async (userId: number) => {
	return await prisma.user.findUnique({
		where: {
			id: userId
		}
	})
}

/**
 * Create a user. vad som skickas IN 
 */
export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({
		data: data,
	})
}


