import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../../types'
import { getUserById } from '../../services/user_service'

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
	const user = await getUserById(req.token!.sub)
	if (!user) {
		return res.status(401).send({
			status: "fail",
			data: "Access denied",
		})
	}

	next();
};

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization) {
		return res.status(401).send({
			status: "fail",
			data: "Authorization header required",
		})
	}

	const [authSchema, token] = req.headers.authorization.split(" ")
	if (authSchema.toLowerCase() !== "bearer") {
		return res.status(401).send({
			status: "fail",
			data: "Authorization bearer - token required",
		})
	}

	try {
		const payload = (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "") as unknown) as JwtPayload
		req.token = payload

	} catch (err) {
		return res.status(401).send({
			status: "fail",
			data: "Authorization payload required",
		})
	}

	next()
}
