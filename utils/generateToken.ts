import jwt from 'jsonwebtoken'

export const createAccessToken = (payload: { userId: string }) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY || '', {
		expiresIn: '10h',
	})
}

export const createRefreshToken = (payload: { userId: string }) => {
	return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY || '', {
		expiresIn: '7d',
	})
}
