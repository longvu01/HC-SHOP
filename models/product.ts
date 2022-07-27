import { Image } from './image'

export interface Product {
	_id?: any
	title: string
	category: string
	code: string
	price: number
	info: Array<string>
	description: string
	checked: boolean
	comments: number
	rating: number
	//
	salePrice?: number
	viewCount?: number
	commentCount?: number
	ratingCount?: number
	ratingValue?: number
	categoryName?: string
	categoryId?: string
	//
	inStock: number
	sold: number
	images?: Image[]
}

export interface ProductResponse {
	status: 'success' | 'failed'
	message?: string
	total: number

	products: Product | Product[]
}
