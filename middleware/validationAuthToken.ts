import UserModel from '@/modelsMongoDB/userModel'
import { handleErrorJSON } from '@/utils'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './mongodb'

export const validationAuthToken = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<any> => {
	try {
		await dbConnect()

		const accessToken = req.headers.authorization
		if (!accessToken) {
			return res.status(400).json({ message: 'Invalid Token' })
		}

		const isValidToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY || '')
		if (!isValidToken || typeof isValidToken === 'string') {
			return res.status(400).json({ message: 'Invalid Authentication' })
		}

		const user = await UserModel.findById(isValidToken.userId)
		return { userId: user._id.toString() }
	} catch (error) {
		res.status(500).json(handleErrorJSON(error))
	}
}
