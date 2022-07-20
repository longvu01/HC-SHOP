import { useAppDispatch } from '@/app/hooks'
import { cartActions, CartItem } from '@/features/cart/cartSlice'
import { formatCurrency } from '@/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Link as MuiLink,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent } from 'react'
import { CartQuantityForm } from './CartQuantityForm'

export interface CartProductItemProps {
	cartItem: CartItem
	onOpenRemoveDialog: (cartItemId: number) => void
}

export function CartProductItem({ cartItem, onOpenRemoveDialog }: CartProductItemProps) {
	const dispatch = useAppDispatch()

	const handleQuantitySubmit = (quantity: number) => {
		const itemValue = {
			_id: cartItem._id,
			quantity,
		}

		dispatch(cartActions.setQuantity(itemValue))
	}

	const handleToggleCartItemActive = (e: ChangeEvent<HTMLInputElement>, cartItemId: string) => {
		dispatch(cartActions.toggleActive({ cartItemId }))
	}

	const handleDeleteItem = () => {
		onOpenRemoveDialog(cartItem._id)
		// dispatch(cartActions.removeFromCart({ idToRemove: cartItem._id }))
	}

	return (
		<Paper
			key={cartItem._id}
			elevation={0}
			sx={{
				p: 1.5,
				width: '100%',
			}}
		>
			<Box
				sx={{
					display: 'grid',
					gridGap: '10px',
					gridTemplateColumns: '2fr repeat(3, 1fr) 0.2fr',
					alignItems: 'center',
				}}
			>
				<FormGroup>
					<Stack direction="row" spacing={1} alignItems="center">
						<FormControlLabel
							checked={cartItem.isActive}
							control={<Checkbox onChange={(e) => handleToggleCartItemActive(e, cartItem._id)} />}
							label=""
							sx={{ mr: 0 }}
						/>

						<Link href={`/product/${cartItem._id}`} passHref>
							<Box sx={{ width: 70, height: 70, ml: '0px !important', cursor: 'pointer' }}>
								{/* TODO: Fix src after add new data to db */}
								<Image
									src={cartItem.images?.[0].url as string}
									alt={cartItem.title}
									layout="responsive"
									width="100%"
									height="100%"
								/>
							</Box>
						</Link>

						<Box>
							<Link href={`/product/${cartItem._id}`} passHref>
								<MuiLink>{cartItem.title}</MuiLink>
							</Link>
							<Typography>Mã SP: {cartItem.code}</Typography>
						</Box>
					</Stack>
				</FormGroup>

				{/* Đơn giá */}
				{/* TODO: Fix price after add new data to db */}
				<Typography>{formatCurrency(cartItem.salePrice || cartItem.price)}</Typography>

				<Box>
					<CartQuantityForm
						initialValues={{ quantity: cartItem.quantity }}
						onSubmit={handleQuantitySubmit}
					/>
				</Box>

				{/* Thành tiền */}
				{/* TODO: Fix price after add new data to db */}
				<Typography>
					{formatCurrency(cartItem.salePrice || cartItem.price * cartItem.quantity)}
				</Typography>

				<Button onClick={handleDeleteItem}>
					<DeleteIcon />
				</Button>
			</Box>
		</Paper>
	)
}
