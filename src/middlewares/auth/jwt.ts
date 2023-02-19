/**
 * JWT Authentication Middleware
 */
import Debug from 'debug'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../../types'

const debug = Debug('PHOTOALBUM:jwt')


export const validateUser = (req: Request, res: Response, next: NextFunction) => {
	console.log("valideras som anv'ndare ")
	// Get user ID from URL params
	const userId = req.params.userId;
	console.log(userId)

	// Compare user ID in token with user ID in URL params
	if (!req.token || req.token.sub !== Number(userId)) {
		console.log(req.token, userId)
		return res.status(403).json({ error: "Forbidden: User not authorized" });

	}

	next();
};
/**
 * Validate JWT Access Token
 *
 * Authorization: Bearer <token>
 * 
 */
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/jwt!")
	console.log("valideras")


	// Make sure Authorization header exists, otherwise bail 🛑
	if (!req.headers.authorization) {
		debug("Authorization header missing")

		return res.status(401).send({
			status: "fail",
			data: "Authorization header required",
		})
	}

	// Split Authorization header on ` `
	// "Bearer <token>"
	const [authSchema, token] = req.headers.authorization.split(" ")

	// Check that Authorization scheme is "Bearer", otherwise bail 🛑
	if (authSchema.toLowerCase() !== "bearer") {
		debug("Authorization schema isn't Bearer")

		return res.status(401).send({
			status: "fail",
			data: "Authorization bearer - token required",
		})
	}

	// Verify token and attach payload to request, otherwise bail 🛑
	try {
		const payload = (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "") as unknown) as JwtPayload
		debug("Yay got 📦: %o", payload)

		// Attach payload to Request 🤩
		req.token = payload

	} catch (err) {
		debug("Token failed verification", err)

		return res.status(401).send({
			status: "fail",
			data: "Authorization payload required",
		})
	}

	// Pass request along ✅
	next()
}
