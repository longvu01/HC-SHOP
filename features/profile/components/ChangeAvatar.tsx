import userApi from '@/api-client/userApi'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { authActions, selectUserAccessToken } from '@/features/auth/authSlice'
import { file2Base64, handleErrorMessage, imagesUpload } from '@/utils'
import { Avatar, Box, LinearProgress } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import 'cropperjs/dist/cropper.css'
import { ChangeEvent, useRef, useState } from 'react'
import { Cropper, ReactCropperElement } from 'react-cropper'
import { toast } from 'react-toastify'

export interface ChangeAvatarProps {
	fullName: string
	avatar: string
}

export function ChangeAvatar({ fullName, avatar }: ChangeAvatarProps) {
	const [loadingUpload, setLoadingUpload] = useState(false)
	const [openDialog, setOpenDialog] = useState(false)
	const [uploadedFile, setUploadedFile] = useState<string>('')

	const fileRef = useRef<HTMLInputElement>(null)
	const cropperRef = useRef<ReactCropperElement>(null)

	const dispatch = useAppDispatch()

	const accessToken = useAppSelector(selectUserAccessToken)

	// Handlers
	const handleClickOpen = () => {
		setOpenDialog(true)
	}

	const handleClose = () => {
		setOpenDialog(false)
	}

	const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target?.files?.[0]

		if (!file) return toast.error('Không tìm thấy file')

		// 5 MB
		if (file.size > 5242880) return toast.error('File quá lớn')

		if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
			return toast.error('Dạng file không hợp lệ')
		}

		file2Base64(file).then((base64) => {
			setUploadedFile(base64)
		})
	}

	const handleCropClick = async () => {
		setLoadingUpload(true)

		const imageElement: any = cropperRef?.current
		const cropper: any = imageElement?.cropper

		await cropper.getCroppedCanvas().toBlob(async (blob: any) => {
			try {
				const userAvatar = await imagesUpload([blob])

				const userAvatarUrl = userAvatar[0].url

				const res = await userApi.update({ avatar: userAvatarUrl }, accessToken)

				setUploadedFile('')

				dispatch(authActions.setUserData(res.data))

				setOpenDialog(false)
				toast.success('Thay đổi ảnh đại diện thành công')
			} catch (error) {
				toast.error(handleErrorMessage(error))
			}

			setLoadingUpload(false)
		})
	}

	return (
		<>
			<Box width={50} height={50} sx={{ cursor: 'pointer' }} onClick={handleClickOpen}>
				<Avatar alt={fullName} src={avatar} sx={{ width: '100%', height: '100%' }} />
			</Box>

			<Dialog
				open={openDialog}
				onClose={handleClose}
				aria-labelledby="change-avatar-dialog-title"
				aria-describedby="change-avatar-dialog-description"
			>
				<DialogTitle id="change-avatar-dialog-title">Thay đổi ảnh đại diện của bạn</DialogTitle>

				{loadingUpload && <LinearProgress />}

				<DialogContent>
					<input
						type="file"
						style={{ display: 'none' }}
						ref={fileRef}
						onChange={handleFileInputChange}
						accept="image/png,image/jpeg"
					/>

					<Cropper
						src={uploadedFile}
						style={{ maxHeight: 400, maxWidth: 400 }}
						autoCropArea={0.7}
						aspectRatio={1}
						viewMode={3}
						guides={false}
						ref={cropperRef}
					/>

					<Button
						variant="contained"
						color="info"
						sx={{ mt: 2 }}
						fullWidth
						onClick={() => fileRef.current?.click()}
					>
						Tải ảnh lên
					</Button>
				</DialogContent>
				{uploadedFile && (
					<DialogActions>
						<Button color="secondary" variant="outlined" onClick={handleClose}>
							Hủy bỏ
						</Button>
						<Button variant="contained" onClick={handleCropClick}>
							Chấp nhận
						</Button>
					</DialogActions>
				)}
			</Dialog>
		</>
	)
}
