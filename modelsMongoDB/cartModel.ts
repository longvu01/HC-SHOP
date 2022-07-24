import { CartItemSlice } from '@/features/cart/cartSlice'
import { model, models, Schema } from 'mongoose'

export const CartSchema = new Schema<CartItemSlice>(
	{
		title: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		info: {
			type: [String],
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		checked: {
			type: Boolean,
			default: false,
		},
		comments: {
			type: Number,
			default: 0,
		},
		rating: {
			type: Number,
			default: 0,
		},
		inStock: {
			type: Number,
			default: 0,
		},
		sold: {
			type: Number,
			default: 0,
		},
		images: {
			type: Array,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
)

let CartModel = models.carts || model<CartItemSlice>('carts', CartSchema)

export default CartModel
