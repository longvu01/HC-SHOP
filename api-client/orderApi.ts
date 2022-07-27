import { DataResponse } from './../models/common'
import { Order } from '@/models'
import axiosClient from './axiosClient'

const orderApi = {
	add(orderData: Order, accessToken: string): Promise<DataResponse<Order>> {
		const url = `/order`
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
		}
		return axiosClient.post(url, { params: orderData }, config)
	},
}

export default orderApi
