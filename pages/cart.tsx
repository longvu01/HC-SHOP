import { useAppSelector } from '@/app/hooks'
import { CartProductItem, DiscountOrGiftForm, HeaderLeft } from '@/components/cart'
import { Seo } from '@/components/Common'
import PageBreadCrumbs from '@/components/Common/PageBreadCrumbs'
import { selectCurrentUser } from '@/features/auth/authSlice'
import { selectCartItems, selectCartTotalPrice } from '@/features/cart/cartSlice'
import { MainLayout } from '@/layouts'
import { formatCurrency } from '@/utils'
import {
	Box,
	Button,
	Container,
	Divider,
	Link as MuiLink,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Link from 'next/link'
import { useState } from 'react'
import WarningIcon from '@mui/icons-material/Warning'

// const CartPage: NextPageWithLayout = ({ arrayProductList }: CartPageProps) => {
const CartPage = () => {
	const [openRemoveDialog, setOpenRemoveDialog] = useState(false)

	const handleClickOpenRemoveDialog = (cartItemId: number) => {
		setOpenRemoveDialog(true)
	}

	const handleCloseRemoveDialog = () => {
		setOpenRemoveDialog(false)
	}

	const currentUser = useAppSelector(selectCurrentUser)
	const cartTotalPrice = useAppSelector(selectCartTotalPrice)

	const cartItems = useAppSelector(selectCartItems)

	const breadCrumbsData = [
		{
			title: 'Trang chủ',
			href: '/',
		},
		{
			title: 'Giỏ hàng của bạn',
			href: '/cart',
		},
	]

	return (
		<Box pb={{ xs: 7, md: 9 }}>
			<Seo />

			<Container maxWidth="xl" sx={{ pt: 8 }}>
				<PageBreadCrumbs data={breadCrumbsData} />
				<Typography variant="h6" component="h2" fontWeight="bold">
					Giỏ hàng
				</Typography>

				<Stack direction="row" spacing={1}>
					{/* Left */}
					<Stack sx={{ flex: '1 1 0' }}>
						{/* Top */}
						<HeaderLeft />

						<Stack>
							{cartItems.map((cartItem) => (
								<CartProductItem
									key={cartItem._id}
									cartItem={cartItem}
									onOpenRemoveDialog={handleClickOpenRemoveDialog}
								/>
							))}
						</Stack>
					</Stack>

					{/* Right */}
					<Stack sx={{ width: '445px' }} spacing={1}>
						<Paper sx={{ p: 2 }} elevation={0}>
							<Stack direction="row" justifyContent="space-between">
								<Typography variant="body1" fontWeight="bold">
									Giao tới
								</Typography>
								<Link href="/" passHref>
									<MuiLink sx={{ color: '#4281f8' }}>Thay đổi</MuiLink>
								</Link>
							</Stack>

							<Stack direction="row" mt={1}>
								<Typography variant="body1" fontWeight="nold">
									{currentUser?.fullName}
								</Typography>
								<Divider orientation="vertical" sx={{ mx: 2 }} flexItem />
							</Stack>

							<DiscountOrGiftForm />
						</Paper>

						<Paper sx={{ p: 2, pt: 1.5 }} elevation={0}>
							<Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
								<Typography variant="body2">Tạm tính</Typography>
								<Typography variant="body1" fontWeight="bold">
									{formatCurrency(cartTotalPrice)}
								</Typography>
							</Stack>
							<Divider />

							<Stack direction="row" justifyContent="space-between" alignItems="center" my={1}>
								<Typography variant="body2">Giảm giá</Typography>
								<Typography variant="body1" fontWeight="bold">
									0₫
								</Typography>
							</Stack>
							<Divider />

							<Stack direction="row" justifyContent="space-between" alignItems="center" my={1}>
								<Typography variant="body2">Thành tiền</Typography>
								<Typography variant="body1" fontWeight="bold" sx={{ color: '#ee2724' }}>
									{formatCurrency(cartTotalPrice)}
								</Typography>
							</Stack>
							<Divider />
						</Paper>
						<Button variant="contained" fullWidth sx={{ textTransform: 'unset' }}>
							Tiến hành đặt hàng
						</Button>
					</Stack>
				</Stack>

				<Dialog
					open={openRemoveDialog}
					onClose={handleCloseRemoveDialog}
					aria-labelledby="alert-dialog-remove-cart-item"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle
						id="alert-dialog-title"
						sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
					>
						<WarningIcon sx={{ color: '#ff9100' }} />
						Xóa sản phẩm
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Bạn có muốn xóa sản phẩm đang chọn?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseRemoveDialog}>Xác nhận</Button>
						<Button onClick={handleCloseRemoveDialog} autoFocus>
							Hủy
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</Box>
	)
}

CartPage.Layout = MainLayout

export default CartPage
