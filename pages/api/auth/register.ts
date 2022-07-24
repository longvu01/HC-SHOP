import dbConnect from '@/middleware/mongodb'
import UserModel from '@/modelsMongoDB/userModel'
import { createAccessToken, createRefreshToken, handleErrorJSON } from '@/utils'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'POST':
			try {
				await register(req, res)
			} catch (error) {
				res.status(400).json(handleErrorJSON(error))
			}
			break
		default:
			res.status(405).json({ message: 'Method Not Allowed!' })
			break
	}
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Field from register form
		const { fullName, email, password } = req.body.params

		const hashedPassword = bcrypt.hashSync(password, process.env.SALT as string)

		// Check if email exists
		const isUserExists = await UserModel.findOne({ email })
		if (isUserExists) return res.status(400).json({ message: 'Email này đã tồn tại!' })

		// Register new user + save to DB
		const newUser = new UserModel({ fullName, email, password: hashedPassword })
		await newUser.save()

		const userId = newUser._id.toString()

		// Generate accessToken, refreshToken
		const accessToken = createAccessToken({ userId })
		const refreshToken = createRefreshToken({ userId })

		const { role, avatar, root } = newUser

		res.status(200).json({
			message: 'Đăng ký thành công!',
			accessToken,
			refreshToken,
			user: {
				_id: userId,
				fullName,
				email,
				role,
				avatar,
				root,
			},
		})
	} catch (error) {
		res.status(500).json(handleErrorJSON(error))
	}
}
