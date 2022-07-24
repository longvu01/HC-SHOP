import { CartItemSlice } from '@/features/cart/cartSlice'

export interface Order {
	userId?: string
	address: string
	phoneNumber: string
	cartItems: CartItemSlice[]
	total: number
	delivered?: boolean
}
