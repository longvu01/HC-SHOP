import { DataResponse, User } from '@/models'
import axiosClient from './axiosClient'

const userApi = {
	update(
		params: Partial<User> | { newPassword: string },
		accessToken: string
	): Promise<DataResponse<User>> {
		const url = 'user/update'
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
		}
		return axiosClient.patch(url, { params }, config)
	},
}

export default userApi
