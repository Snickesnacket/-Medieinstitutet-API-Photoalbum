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
	id: Int,
	email: String,
	password: String,
	first_name: String,
	last_name: String,
	albums?: Album[],
	photos?: Photo[]
}

export type UpdateUserData = {
	first_name?: String,
	last_name?: String,
	email?: string,
	password?: string,
}

export type JwtPayload = {
	sub: number,
	name: string,
	email: string,
	iat?: number,
	exp?: number,
}
