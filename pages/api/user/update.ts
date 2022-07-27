import dbConnect from '@/middleware/mongodb'
import { validationAuthToken } from '@/middleware/validationAuthToken'
import UserModel from '@/modelsMongoDB/userModel'
import { handleErrorJSON } from '@/utils'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'PATCH':
			try {
				await updateData(req, res)
			} catch (error) {
				res.status(400).json(handleErrorJSON(error))
			}
			break
		default:
			res.status(405).json({ message: 'Method Not Allowed' })
			break
	}
}

const updateData = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const userRes = await validationAuthToken(req, res)

		const { userId } = userRes
		const {
			fullName,
			phoneNumber,
			email,
			gender,
			address,
			cityCode,
			districtCode,
			newPassword,
			avatar,
		} = req.body.params

		let userUpdateQueries = {}

		if (newPassword) {
			// Change password
			const hashedPassword = bcrypt.hashSync(newPassword, process.env.SALT || '')

			userUpdateQueries = {
				password: hashedPassword,
			}
		} else if (avatar) {
			// Change avatar
			userUpdateQueries = {
				avatar,
			}
		} else {
			// Change info
			userUpdateQueries = {
				fullName,
				phoneNumber,
				email,
				gender,
				address,
				cityCode,
				districtCode,
			}
		}

		const newUserInfo = await UserModel.findOneAndUpdate({ _id: userId }, userUpdateQueries, {
			new: true,
		}).select('-password')

		console.log(newUserInfo)

		res.status(200).json({
			message: 'Cập nhật thông tin thành công',
			data: newUserInfo,
		})
	} catch (error) {
		res.status(500).json(handleErrorJSON(error))
	}
}
