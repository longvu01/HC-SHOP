import { useAppSelector } from '@/app/hooks'
import WarningIcon from '@mui/icons-material/Warning'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { selectCartItems } from '../cartSlice'

export interface RemoveDialogProps {
	idToRemove: string
	isShowDialog: boolean
	isDeleteMore: boolean
	onClose: () => void
	onConfirm: () => void
}

export function RemoveDialog({
	idToRemove,
	isShowDialog,
	isDeleteMore,
	onClose,
	onConfirm,
}: RemoveDialogProps) {
	const cartItems = useAppSelector(selectCartItems)

	const currentItem = cartItems.find((cartItem) => cartItem._id === idToRemove)
	const currentItemName = currentItem?.title

	return (
		<Dialog
			open={isShowDialog}
			onClose={onClose}
			aria-labelledby="alert-dialog-remove-cart-item"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<WarningIcon sx={{ color: '#ff9100' }} />
				{currentItemName || 'Xóa sản phẩm'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Bạn có muốn xóa {isDeleteMore && 'các'} sản phẩm đang chọn?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onConfirm} variant="contained" color="warning">
					Xác nhận
				</Button>
				<Button onClick={onClose} variant="contained" autoFocus>
					Hủy
				</Button>
			</DialogActions>
		</Dialog>
	)
}
