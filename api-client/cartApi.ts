import { CartItemSlice } from './../features/cart/cartSlice'
import axiosClient from './axiosClient'

const cartApi = {
	getById(userId: string): Promise<CartItemSlice> {
		const url = `/cart/${userId}`
		return axiosClient.get(url)
	},

	update(data: Partial<CartItemSlice>): Promise<CartItemSlice> {
		const url = '/'
		return axiosClient.patch(url, data)
	},

	delete(id: string): Promise<any> {
		const url = `/cart/${id}`
		return axiosClient.delete(url)
	},
}

export default cartApi
