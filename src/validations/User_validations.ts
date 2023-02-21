import { body } from 'express-validator'
import { getUserByEmail } from '../services/user_service'


export const registerUserRules = [
	body('email').isEmail().isString().custom(async (value: string) => {
		// check if a User with that email already exists
		const user = await getUserByEmail(value)

		if (user) {
			// user already exists, throw a hissy-fit
			return Promise.reject("Email already exists")
		}
	}),
	body('password').isString().bail().isLength({ min: 6 }),
	body('first_name').isString().bail().isLength({ min: 3 }),
	body('last_name').isString().bail().isLength({ min: 3 })
]

export const loginUserRules = [
	body('email').isEmail().isString().custom(async value => {
		//check that email exists 
		const user = await getUserByEmail(value)

		if (!user) {
			return Promise.reject("user dosen't exist")
		}
	}),
	body('password').isString().bail().isLength({ min: 6 }),
]
