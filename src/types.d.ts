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
	userId: number
	id: number
}
export type createPhototoAlbumData = {
	photo_id: number,
	albumId: number
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

export type updateAlbumData = {
	title?: string,
}

export type UpdatePhotoData = {
	title: string,
	url: string,
	comment: string,
}

export type AlbumPhotoDelete = {
	photos?: {
		disconnect?: {
			id: number;
		};
	};
}
