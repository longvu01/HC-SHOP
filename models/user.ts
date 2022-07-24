export interface User {
	_id: string
	fullName: string
	email: string
	password: string
	role?: string
	root?: boolean
	avatar?: string
	accessToken?: string
	refreshToken?: string
}
