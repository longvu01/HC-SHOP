export const handleErrorJSON = (error: any) => {
	if (error instanceof Error || error.message) {
		return { message: error.message }
	}
	return { message: `Unexpected error ${error}` }
}

export const handleErrorMessage = (error: any) => {
	if (error instanceof Error || error.message) {
		return error.message
	}
	return `Unexpected error ${error}`
}

export const formatCurrency = (price: number) => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(price)
}

export const formatDate = (date: Date) => {
	return new Intl.DateTimeFormat('vi-VN').format(date)
}
