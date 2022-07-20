import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { cartActions, selectCartItemActive, selectCartItemCount } from '@/features/cart/cartSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, FormControlLabel, FormGroup, Paper, Typography } from '@mui/material'

export interface HeaderLeftProps {}

export function HeaderLeft(props: HeaderLeftProps) {
	const cartItemCount = useAppSelector(selectCartItemCount)
	const cartItemActiveCount = useAppSelector(selectCartItemActive).length

	const isAllCartItemActive = cartItemCount === cartItemActiveCount

	const dispatch = useAppDispatch()

	// Handlers
	const handleButtonDeleteAllClick = () => {}

	const handleToggleAllCartItemActive = () => {
		dispatch(cartActions.toggleActiveAll())
	}

	return (
		<Paper
			elevation={0}
			sx={{
				display: 'grid',
				gridGap: '10px',
				gridTemplateColumns: '2fr repeat(3, 1fr) 0.2fr',
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
