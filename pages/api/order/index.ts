import { CartItemSlice } from '@/features/cart/cartSlice'
import dbConnect from '@/middleware/mongodb'
import { validationAuthToken } from '@/middleware/validationAuthToken'
import OrderModel from '@/modelsMongoDB/orderModel'
import ProductModel from '@/modelsMongoDB/productModel'
import { handleErrorJSON } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'POST':
			try {
				await makeOrder(req, res)
			} catch (error) {
				res.status(400).json(handleErrorJSON(error))
			}
			break
		default:
			res.status(405).json({ message: 'Method Not Allowed' })
			break
	}
}

const makeOrder = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const userRes = await validationAuthToken(req, res)

		const { userId } = userRes
		const { total, address, phoneNumber, cartItems } = req.body.params

		// TODO: delete unneeded key

		const newOrder = new OrderModel({
			userId,
			total,
			address,
			phoneNumber,
			cartItems,
		})

		const sellProductList = cartItems.map(
			({ _id: productId, quantity, inStock: prevInStock, sold: prevSold }: CartItemSlice) =>
				sellProduct({
					productId,
					quantity,
					prevInStock,
					prevSold,
				})
		)

		await Promise.all(sellProductList)

		await newOrder.save()

		res.status(200).json({
			message: 'Thanh toán thành công. Chúng tôi sẽ liên hệ để xác nhận đơn hàng',
			data: newOrder,
		})
	} catch (error) {
		res.status(500).json(handleErrorJSON(error))
	}
}

const sellProduct = async ({
	productId,
	quantity,
	prevInStock,
	prevSold,
}: {
	productId: string
	quantity: number
	prevInStock: number
	prevSold: number
}) => {
	await ProductModel.findOneAndUpdate(
		{
			_id: productId,
		},
		{
			inStock: prevInStock - quantity,
			sold: prevSold + quantity,
		}
	)
}
