import { User } from './user'

export interface AuthPayload {
	fullName?: string
	email: string
	password: string
	retypePassword?: string
}

export interface AuthResponse {
	message?: string
	accessToken: string
	refreshToken?: string

	user: User
}
