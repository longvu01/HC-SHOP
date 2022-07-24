import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { cartActions, selectCartItemActive, selectCartItemCount } from '@/features/cart/cartSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, FormControlLabel, FormGroup, Paper, Typography } from '@mui/material'
import { toast } from 'react-toastify'

export interface HeaderLeftProps {
	onOpenRemoveDialog: () => void
	setIsDeleteMore: (isDeleteMore: boolean) => void
}

export function HeaderLeft({ onOpenRemoveDialog, setIsDeleteMore }: HeaderLeftProps) {
	const cartItemCount = useAppSelector(selectCartItemCount)
	const cartItemActiveCount = useAppSelector(selectCartItemActive).length

	const isAllCartItemActive = cartItemCount === cartItemActiveCount && cartItemActiveCount > 0

	const dispatch = useAppDispatch()

	// Handlers
	const handleButtonDeleteAllClick = () => {
		if (cartItemActiveCount === 0) {
			toast.info('Bạn chưa chọn sản phẩm nào')
			return
		}

		if (cartItemActiveCount > 1) setIsDeleteMore(true)

		onOpenRemoveDialog()
	}

	const handleToggleAllCartItemActive = () => {
		dispatch(cartActions.toggleActiveAll())
	}

	return (
		<Paper
			elevation={0}
			sx={{
				display: 'grid',
				gridGap: '10px',
				gridTemplateColumns: '1.8fr repeat(3, 1fr) 0.1fr',
				py: 0.5,
				px: 1.5,
				mb: 1.5,
			}}
		>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox checked={isAllCartItemActive} onChange={handleToggleAllCartItemActive} />
					}
					label={`Tất cả (${cartItemCount} sản phẩm)`}
				/>
			</FormGroup>

			{['Đơn giá', 'Số lượng', 'Thành tiền'].map((text) => (
				<Typography key={text} sx={{ mt: '10px' }}>
					{text}
				</Typography>
			))}

			<Button onClick={handleButtonDeleteAllClick}>
				<DeleteIcon />
			</Button>
		</Paper>
	)
}
