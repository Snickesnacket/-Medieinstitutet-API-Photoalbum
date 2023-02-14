/**
 * Type Definitions
 */

import internal from "stream"

export type CreateAlbumData = {
	title: string,

}

export type CreatePhotoData = {
	id: int
	title: string
	url: string
	comment?: string
	album: Album[]
	user: user
	user_id: int
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
