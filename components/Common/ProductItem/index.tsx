import { Product } from '@/models'
import { Box, Chip, Rating, Stack, Link as MuiLink, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import CallIcon from '@mui/icons-material/Call'
import styles from './ProductItem.module.scss'
import { formatCurrency } from '@/utils'
import DoneIcon from '@mui/icons-material/Done'
import { useAppDispatch } from '@/app/hooks'
import { cartActions } from '@/features/cart/cartSlice'

export interface ProductItemProps {
	product: Product
}

export default function ProductItem({ product }: ProductItemProps) {
	const dispatch = useAppDispatch()

	const handleAddToCart = () => {
		const cartItem = {
			...product,
			quantity: 1,
		}

		dispatch(cartActions.addToCart(cartItem))
	}

	return (
		<Box p={1}>
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

			<Stack direction="row" justifyContent="space-between" alignItems="center" my={1}>
				<Stack direction="row" alignItems="center">
					<Rating size="small" name="rating" value={0} readOnly />
					<Typography component="span">({product.ratingCount?.toString()})</Typography>
				</Stack>
				<Chip label={`MÃ: ${product.code}`} size="small" />
			</Stack>

			<Link href={`product/${product._id}`} passHref>
				<MuiLink className={styles.title}>{product.title}</MuiLink>
			</Link>

			<Stack direction="row" spacing={1} alignItems="center" mt={1}>
				<Typography sx={{ textDecoration: 'line-through', color: '#666' }}>
					{formatCurrency(+product.price)}
				</Typography>
				<Typography sx={{ color: '#d82a29', fontSize: 12 }}>(Tiết kiệm: 3%)</Typography>
			</Stack>

			<Typography variant="h5">{formatCurrency(+product.price)}</Typography>

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
