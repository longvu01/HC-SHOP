import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Seo } from '@/components/Common'
import PageBreadCrumbs from '@/components/Common/PageBreadCrumbs'
import { selectCurrentUser } from '@/features/auth/authSlice'
import { CartProductItem, DiscountOrGiftForm, HeaderLeft, RemoveDialog } from '@/features/cart'
import { cartActions, selectCartItems, selectCartTotalPrice } from '@/features/cart/cartSlice'
import { PaypalButtonPurchase } from '@/features/cart/components'
import { MainLayout } from '@/layouts'
import cartEmpty from '@/public/cart-empty.png'
import { formatCurrency } from '@/utils'
import {
	Box,
	Button,
	Collapse,
	Container,
	Divider,
	List,
	ListItem,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'

// const CartPage: NextPageWithLayout = ({ arrayProductList }: CartPageProps) => {
const CartPage = () => {
	const dispatch = useAppDispatch()

	const [isPurchaseMode, setIsPurchaseMode] = useState(false)
	const [address, setAddress] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [openInfo, setOpenInfo] = useState(false)
	const [idToRemove, setIdToRemove] = useState('')
	const [isDeleteMore, setIsDeleteMore] = useState(false)
	const [isShowRemoveDialog, setIsShowRemoveDialog] = useState(false)

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

	// Handlers
	const handleToggleOpenInfo = () => {
		setOpenInfo((open) => !open)
	}

	const handleOpenRemoveDialog = () => {
		setIsShowRemoveDialog(true)
	}

	const handleCloseRemoveDialog = () => {
		setIsShowRemoveDialog(false)

		// Wait dialog close (0.1s) and reset state
		setTimeout(() => {
			if (isDeleteMore) setIsDeleteMore(false)
			if (idToRemove) setIdToRemove('')
		}, 100)
	}

	const handleConfirmRemoveDialog = () => {
		if (isDeleteMore) {
			dispatch(cartActions.removeCartItemsActive())
		} else {
			dispatch(cartActions.removeFromCart(idToRemove))
		}

		setIsShowRemoveDialog(false)
	}

	const handlePurchase = () => {
		if (!address.trim() || !phoneNumber.trim()) {
			toast.info('Bạn cần thêm đầy đủ thông tin giao hàng')
			return
		}

		setIsPurchaseMode(true)
	}

	return (
		<Box pb={{ xs: 7, md: 9 }}>
			<Seo />

			<Container maxWidth="xl" sx={{ pt: 8 }}>
				<PageBreadCrumbs data={breadCrumbsData} />
				<Typography variant="h6" component="h2" fontWeight="bold">
					Giỏ hàng
				</Typography>

				{cartItems.length === 0 && (
					<Paper elevation={0} sx={{ pt: 8, pb: 10 }}>
						<Stack alignItems="center">
							<Image src={cartEmpty} alt="cart-empty" />

							<Typography my={2.5}>Không có sản phẩm nào trong giỏ hàng của bạn</Typography>

							<Link href="/" passHref>
								<Button
									variant="contained"
									sx={{
										textTransform: 'unset',
										px: 4,
										bgcolor: '#f78d1c',
										'&:hover': {
											bgcolor: '#f78d1c',
										},
									}}
								>
									Tiếp tục mua sắm
								</Button>
							</Link>
						</Stack>
					</Paper>
				)}

				{cartItems.length > 0 && (
					<Stack direction="row" spacing={1}>
						{/* Left side*/}
						<Stack sx={{ flex: '1 1 0' }}>
							{/* Top */}
							<HeaderLeft
								onOpenRemoveDialog={handleOpenRemoveDialog}
								setIsDeleteMore={setIsDeleteMore}
							/>

							<Stack>
								{cartItems.map((cartItem) => (
									<CartProductItem
										key={cartItem._id}
										cartItem={cartItem}
										onOpenRemoveDialog={handleOpenRemoveDialog}
										setIdToRemove={setIdToRemove}
									/>
								))}
							</Stack>
						</Stack>

						{/* Right side*/}
						<Stack sx={{ width: '400px' }} spacing={1}>
							<Paper sx={{ p: 2 }} elevation={0}>
								<Stack direction="row" justifyContent="space-between" alignItems="center">
									<Typography variant="body1" fontWeight="bold">
										Giao tới
									</Typography>
									<Button
										sx={{ textTransform: 'unset', '&:hover': { bgcolor: 'unset' } }}
										onClick={handleToggleOpenInfo}
									>
										Thêm thông tin
									</Button>
								</Stack>

								<Collapse in={openInfo} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItem sx={{ pl: 0 }}>
											<TextField
												label="Địa chỉ"
												variant="outlined"
												fullWidth
												size="small"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
											/>
										</ListItem>
										<ListItem sx={{ pl: 0 }}>
											<TextField
												label="Số điện thoại"
												variant="outlined"
												fullWidth
												size="small"
												type="number"
												value={phoneNumber}
												onChange={(e) => setPhoneNumber(e.target.value)}
											/>
										</ListItem>
									</List>
								</Collapse>

								<Stack direction="row" mt={2.5}>
									<Typography variant="body1" fontWeight="bold">
										{currentUser?.fullName}
									</Typography>
									<Divider orientation="vertical" sx={{ mx: 2 }} flexItem />
									<Typography variant="body1">{phoneNumber}</Typography>
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
							{!isPurchaseMode && (
								<Button
									variant="contained"
									fullWidth
									sx={{ textTransform: 'unset' }}
									onClick={handlePurchase}
								>
									Tiến hành đặt hàng
								</Button>
							)}
							{isPurchaseMode && (
								<PaypalButtonPurchase
									total={cartTotalPrice}
									address={address}
									phoneNumber={phoneNumber}
								/>
							)}
						</Stack>

						<RemoveDialog
							idToRemove={idToRemove}
							isShowDialog={isShowRemoveDialog}
							isDeleteMore={isDeleteMore}
							onClose={handleCloseRemoveDialog}
							onConfirm={handleConfirmRemoveDialog}
						/>
					</Stack>
				)}
			</Container>
		</Box>
	)
}

CartPage.Layout = MainLayout

export default CartPage
