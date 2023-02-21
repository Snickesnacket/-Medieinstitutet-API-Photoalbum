/**
 * Type Definitions
 */

import internal from "stream"

type CreateAlbumData = {
	title: string,
}
export type CreatePhotoData = {
	title: string
	url: string
	comment?: string
	user_id: Int
	id: int
}
export type createPhototoAlbumData = {
	photo_id: int,
	albumId: int
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
