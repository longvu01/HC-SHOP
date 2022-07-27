export interface User {
	_id: string
	fullName: string
	email: string
	password?: string
	//
	address?: string
	phoneNumber?: string
	gender?: 'male' | 'female'
	cityCode?: number
	districtCode?: number
	//
	role?: string
	root?: boolean
	avatar?: string
	accessToken?: string
	refreshToken?: string
}
