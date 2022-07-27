export const file2Base64 = (file: File): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result?.toString() || '')
		reader.onerror = (error) => reject(error)
	})
}

export const imagesUpload = async (images: any[]) => {
	try {
		const uploadImageList = images.map(async (image) => {
			const formData = new FormData()

			formData.append('file', image)
			formData.append('upload_preset', process.env.CLOUD_UPLOAD_PRESET || '')
			formData.append('cloud_name', process.env.CLOUD_NAME || '')

			const res = await fetch(process.env.CLOUD_API || '', {
				method: 'POST',
				body: formData,
			})

			const { public_id, secure_url } = await res.json()

			return { public_id, url: secure_url }
		})

		return await Promise.all(uploadImageList)
	} catch (error) {
		throw error
	}
}
