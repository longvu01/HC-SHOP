import { City } from '@/models'
import axiosClient from './axiosClient'

const cityApi = {
	getAll(): Promise<City[]> {
		const url = '?depth=2'

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: 'https://provinces.open-api.vn/api/',
		}
		return axiosClient.get(url, config)
	},
}

export default cityApi
