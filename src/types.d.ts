/**
 * Type Definitions
 */

import internal from "stream"

type CreateAlbumData = {
	title: string,
	userId: number
}
export type CreatePhotoData = {
	id: int
	title: string
	url: string
	comment?: string
}

export type CreateUserData = {
	email: string,
	password: string,
	first_name: string,
	last_name: string,
}

export type JwtPayload = {
	sub: number,
	email: string,
	password: string,
	first_name: string,
	last_name: string,
	iat?: number,
	exp?: number,
}
