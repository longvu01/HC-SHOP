import { AuthPayload, AuthResponse } from '@/models'
import axiosClient from './axiosClient'

const authApi = {
	register(params: AuthPayload): Promise<any> {
		const url = '/auth/register'
		return axiosClient.post(url, {
			params,
		})
	},

	login(params: Partial<AuthPayload>): Promise<AuthResponse> {
		const url = '/auth/login'
		return axiosClient.post(url, {
			params,
		})
	},

	getInfo(): Promise<Partial<AuthResponse>> {
		const url = '/auth/accessToken'
		return axiosClient.get(url)
	},
}

export default authApi
