import dbConnect from '@/middleware/mongodb'
import CartModel from '@/modelsMongoDB/cartModel'
import { handleErrorJSON } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'GET':
			try {
				await getCart(req, res)
			} catch (error) {
				res.status(400).json(handleErrorJSON(error))
			}
			break
		case 'PATCH':
			try {
				await updateCart(req, res)
			} catch (error) {
				res.status(400).json(handleErrorJSON(error))
			}
			break
		case 'DELETE':
			try {
			} catch (error) {
				res.status(400).json(handleErrorJSON(error))
			}
			break
		default:
			res.status(405).json({ message: 'Method Not Allowed' })
			break
	}
}

const getCart = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { userId } = req.body.params

		const userCart = await CartModel.findOne({ userId })

		const { products } = userCart

		res.status(200).json({
			userId,
			products,
		})
	} catch (error) {
		res.status(500).json(handleErrorJSON(error))
	}
}

const updateCart = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { userId, product } = req.body.params

		await CartModel.findOneAndUpdate(
			{
				userId,
			},
			{
				$push: { products: product },
			}
		)

		res.status(200).json({})
	} catch (error) {
		res.status(500).json(handleErrorJSON(error))
	}
}
