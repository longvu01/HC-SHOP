export interface Category {
	_id: any
	title: string
}

export interface CategoryResponse {
	status?: 'success' | 'failed'
	message?: string

	categoryList: Category[]
}
