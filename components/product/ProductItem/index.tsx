import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { authActions, selectIsLoggedIn } from '@/features/auth/authSlice'
import { cartActions } from '@/features/cart/cartSlice'
import { Product } from '@/models'
import { formatCurrency } from '@/utils'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import CallIcon from '@mui/icons-material/Call'
import DoneIcon from '@mui/icons-material/Done'
import { Box, Chip, Link as MuiLink, Rating, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ProductItem.module.scss'

export interface ProductItemProps {
	product: Product
}

export function ProductItem({ product }: ProductItemProps) {
	const dispatch = useAppDispatch()

	const isLoggedIn = useAppSelector(selectIsLoggedIn)

	// Handlers
	const handleAddToCart = () => {
		const cartItem = {
			...product,
			quantity: 1,
		}

		if (!isLoggedIn) {
			return dispatch(authActions.setRequireLogin())
		}

		dispatch(cartActions.addToCart(cartItem))
		dispatch(cartActions.setShowMiniCart())
	}

	return (
		<Box p={1}>
			{/* Thumbnail */}
			<Link href={`product/${product._id}`} passHref>
				<Box sx={{ cursor: 'pointer' }}>
					<Image
						src={product.images?.[0].url || ''}
						layout="responsive"
						alt={product.title}
						width="100%"
						height="100%"
					/>
				</Box>
			</Link>

			{/* Rating count + product code */}
			<Stack direction="row" justifyContent="space-between" alignItems="center" my={1}>
				<Stack direction="row" alignItems="center">
					<Rating size="small" name="rating" value={0} readOnly />
					<Typography component="span">({product.ratingCount?.toString()})</Typography>
				</Stack>
				<Chip label={`MÃ: ${product.code}`} size="small" />
			</Stack>

			{/* Title */}
			<Link href={`product/${product._id}`} passHref>
				<MuiLink className={styles.title}>{product.title}</MuiLink>
			</Link>

			{/* Original price + sale */}
			<Stack direction="row" spacing={1} alignItems="center" mt={1}>
				<Typography sx={{ textDecoration: 'line-through', color: '#666' }}>
					{formatCurrency(+product.price)}
				</Typography>
				<Typography sx={{ color: '#d82a29', fontSize: 12 }}>(Tiết kiệm: 3%)</Typography>
			</Stack>

			{/* Sale Price */}
			<Typography variant="h5">{formatCurrency(+product.price)}</Typography>

			{/* Status ( in stock || out stock) */}
			<Stack direction="row" justifyContent="space-between" alignItems="center" my={1}>
				{product.inStock > 0 ? (
					<>
						<Stack direction="row" alignItems="center" color="#2cc067">
							<DoneIcon sx={{ mr: 0.5, fontSize: 20 }} />
							<Typography sx={{ fontSize: 14 }}>Còn hàng</Typography>
						</Stack>
						<Box sx={{ cursor: 'pointer' }} onClick={handleAddToCart}>
							<AddShoppingCartIcon />
						</Box>
					</>
				) : (
					<Typography>
						<CallIcon sx={{ mr: 1 }} />
						Liên hệ
					</Typography>
				)}
			</Stack>
		</Box>
	)
}
