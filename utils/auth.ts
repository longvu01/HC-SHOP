export const setFirstLogin = () => {
	localStorage.setItem('status', JSON.stringify({ firstLogin: true }))
}

export const removeFirstLogin = () => {
	let localStorageStatus = JSON.parse(localStorage.getItem('status') || '{}')
	delete localStorageStatus.firstLogin

	localStorage.setItem('status', JSON.stringify(localStorageStatus))
}
