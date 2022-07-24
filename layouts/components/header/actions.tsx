import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Login, Register } from '@/features/auth'
import {
	authActions,
	selectCurrentUser,
	selectIsLoggedIn,
	selectIsRequireLogin,
} from '@/features/auth/authSlice'
import {
	cartActions,
	selectCartItemCount,
	selectCartItemTotalQuantity,
	selectIsShowMiniCart,
} from '@/features/cart/cartSlice'
import { removeCookie, removeFirstLogin } from '@/utils'
import { Close } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CallIcon from '@mui/icons-material/Call'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	CardContent,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Typography,
} from '@mui/material'
import Tippy from '@tippyjs/react/headless'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import 'tippy.js/dist/tippy.css'
import styles from './Header.module.css'

const MODE = {
	LOGIN: 'login',
	REGISTER: 'register',
}

export default function Actions() {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const [mode, setMode] = useState(MODE.REGISTER)
	const [openDialogAuth, setOpenDialogAuth] = useState(false)

	const timeoutId = useRef<ReturnType<typeof setTimeout>>()

	const currentUser = useAppSelector(selectCurrentUser)
	const cartItemCount = useAppSelector(selectCartItemCount)
	const cartItemTotalQuantity = useAppSelector(selectCartItemTotalQuantity)
	const isLoggedIn = useAppSelector(selectIsLoggedIn)
	const isShowMiniCart = useAppSelector(selectIsShowMiniCart)
	const isRequireLogin = useAppSelector(selectIsRequireLogin)

	useEffect(() => {
		// Use cartItemTotalQuantity to re-run this effect if add more cart items
		if (isShowMiniCart) {
			timeoutId.current = setTimeout(() => {
				dispatch(cartActions.setHideMiniCart())
			}, 5000)
		}

		return () => {
			clearTimeout(timeoutId.current)
		}
	}, [dispatch, isShowMiniCart, cartItemTotalQuantity])

	useEffect(() => {
		if (isRequireLogin) setOpenDialogAuth(true)
	}, [isRequireLogin])

	// Handlers
	const handleCloseDialog = () => {
		setOpenDialogAuth(false)

		if (isRequireLogin) dispatch(authActions.unSetRequireLogin())
	}

	const handleRegisterClick = () => {
		setMode(MODE.REGISTER)
		setOpenDialogAuth(true)
	}

	const handleLoginClick = () => {
		setMode(MODE.LOGIN)
		setOpenDialogAuth(true)
	}

	const handleLogoutClick = () => {
		removeCookie('refreshToken')
		removeFirstLogin()
		dispatch(authActions.userLogout())
		dispatch(cartActions.resetCart())
	}

	const handleClickGoToCart = () => {
		router.push('/cart')
		dispatch(cartActions.setHideMiniCart())
	}

	return (
		<>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="stretch"
				color="#fff"
				spacing={2}
				bgcolor="primary.dark"
				px={1}
				borderRadius={2}
			>
				<Stack direction="row" alignItems="center" spacing={1} py={1} mx={0.5} height="100%">
					<CallIcon fontSize="large" />
					<Box>
						<Typography variant="body2">Mua hàng online</Typography>
						<Typography variant="h6">1900.1903</Typography>
					</Box>
					<Divider sx={{ bgcolor: '#fff' }} orientation="vertical" variant="middle" flexItem />
				</Stack>

				{/* Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. */}
				<div style={{ margin: 0 }}>
					<Tippy
						interactive
						offset={[0, -8]}
						render={(attrs) => (
							<>
								<div className={styles.arrow} data-popper-arrow />
								<Card tabIndex={-1} {...attrs}>
									<CardContent>
										<Stack direction="column" spacing={2} width={280}>
											{!isLoggedIn && (
												<>
													<Button
														sx={{
															bgcolor: '#fdd835',
															color: '#333',
															textTransform: 'unset',
															'&:hover': {
																bgcolor: '#fdd835',
															},
														}}
														onClick={handleLoginClick}
													>
														Đăng nhập
													</Button>

													<Button
														sx={{
															bgcolor: '#fdd835',
															color: '#333',
															textTransform: 'unset',
															'&:hover': {
																bgcolor: '#fdd835',
															},
														}}
														onClick={handleRegisterClick}
													>
														Đăng ký
													</Button>
												</>
											)}

											{isLoggedIn && (
												<>
													<Button>Tài khoản của tôi</Button>
													<Button onClick={handleLogoutClick}>Đăng xuất</Button>
												</>
											)}
										</Stack>
									</CardContent>
								</Card>
							</>
						)}
					>
						<Stack direction="row" alignItems="center" spacing={1} py={1} mx={0.5} height="100%">
							{!isLoggedIn && (
								<>
									<AccountCircleIcon fontSize="large" />

									<Stack direction="column" alignItems="flex-start">
										<Button
											sx={{ color: '#fff', textTransform: 'unset', lineHeight: '14px' }}
											size="small"
											onClick={handleRegisterClick}
										>
											Đăng ký
										</Button>
										<Button
											sx={{ color: '#fff', textTransform: 'unset', lineHeight: '14px' }}
											size="small"
											onClick={handleLoginClick}
										>
											Đăng nhập
										</Button>
									</Stack>
								</>
							)}

							{isLoggedIn && (
								<>
									<Box width={35} height={35}>
										<Avatar
											alt={currentUser?.fullName}
											src={currentUser?.avatar || ''}
											sx={{ width: '100%', height: '100%' }}
										/>
									</Box>

									<Box>
										<Typography variant="body2" sx={{ cursor: 'pointer' }}>
											Xin chào
										</Typography>
										<Typography
											variant="body2"
											sx={{ cursor: 'pointer' }}
											onClick={handleLoginClick}
										>
											{currentUser?.fullName}
										</Typography>
									</Box>
								</>
							)}

							<Divider sx={{ bgcolor: '#fff' }} orientation="vertical" variant="middle" flexItem />
						</Stack>
					</Tippy>
				</div>

				{/* Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. */}
				<div style={{ margin: 0 }}>
					<Tippy
						visible={isShowMiniCart}
						interactive
						offset={[0, -8]}
						placement="top-end"
						render={(attrs) => (
							<>
								<div className={styles.arrow} data-popper-arrow />
								<Card tabIndex={-1} {...attrs}>
									<CardContent>
										<Typography
											variant="body2"
											sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
										>
											<CheckCircleIcon sx={{ color: '#26bc4e', fontSize: '14px' }} />
											Thêm vào giỏ hàng thành công
										</Typography>

										<Button
											variant="contained"
											size="small"
											sx={{
												textTransform: 'unset',
												px: 4,
												mt: 1.5,
												bgcolor: '#f78d1c',
												'&:hover': {
													bgcolor: '#f78d1c',
												},
											}}
											onClick={handleClickGoToCart}
										>
											Xem giỏ hàng và thanh toán
										</Button>
									</CardContent>
								</Card>
							</>
						)}
					>
						<Stack direction="row" alignItems="center" spacing={1} py={1} mx={0.5} height="100%">
							<Badge badgeContent={cartItemCount} color="warning">
								<ShoppingCartIcon fontSize="large" />
							</Badge>
							<Box>
								<Link href="/cart" passHref>
									<Typography variant="body2" sx={{ cursor: 'pointer' }}>
										Giỏ hàng
									</Typography>
								</Link>
							</Box>
						</Stack>
					</Tippy>
				</div>
			</Stack>

			<Dialog
				open={openDialogAuth}
				onClose={handleCloseDialog}
				aria-labelledby="auth-dialog-title"
				aria-describedby="auth-dialog-description"
				sx={{ minWidth: '600px' }}
			>
				<IconButton
					onClick={handleCloseDialog}
					sx={{
						position: 'absolute',
						top: 5,
						right: 5,
					}}
				>
					<Close />
				</IconButton>

				<DialogTitle id="auth-dialog-title">Xin chào</DialogTitle>

				<DialogContent>
					{mode === MODE.REGISTER && (
						<>
							<Box>
								<Button sx={{ px: 0 }} onClick={() => setMode(MODE.LOGIN)}>
									Đã có tài khoản? Đăng nhập ngay
								</Button>
							</Box>
							<Register onClose={handleCloseDialog} />
						</>
					)}

					{mode === MODE.LOGIN && (
						<>
							<Box>
								<Button sx={{ px: 0 }} onClick={() => setMode(MODE.REGISTER)}>
									Chưa có tài khoản? Tạo mới ngay
								</Button>
							</Box>
							<Login onClose={handleCloseDialog} />
						</>
					)}
				</DialogContent>
			</Dialog>
		</>
	)
}
