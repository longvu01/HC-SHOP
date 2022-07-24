import { Order } from '@/models/order'
import { model, models, Schema } from 'mongoose'
import { CartSchema } from './cartModel'

export const OrderSchema = new Schema<Order>(
	{
		userId: {
			type: String,
			ref: 'user',
		},
		address: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		cartItems: {
			type: [CartSchema],
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
		delivered: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

let OrderModel = models.orders || model<Order>('orders', OrderSchema)

export default OrderModel
