/**
 * Type Definitions
 */

export type CreateAlbumData = {
	id: Int,
	title: string,
	user: User
	user_id: Int
}

export type CreatePhotoData = {
	id: Int
	title: String
	url: String
	comment?: String
	album: Album[]
	user: User
	user_id: Int
}

export type CreateUserData = {
	id: int,
	email: string,
	password: string,
	first_name: string,
	last_name: string,
}

export type UpdateUserData = {
	first_name?: string,
	last_name?: string,
	email?: string,
	password?: string,
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
