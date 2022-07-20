import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Login, Register } from '@/features/auth'
import { authActions, selectCurrentUser, selectIsLoggedIn } from '@/features/auth/authSlice'
import { selectCartItemCount } from '@/features/cart/cartSlice'
import { removeCookie, removeFirstLogin } from '@/utils'
import { Close } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CallIcon from '@mui/icons-material/Call'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
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
import { useState } from 'react'
import 'tippy.js/dist/tippy.css'
import styles from './Header.module.css'

const MODE = {
	LOGIN: 'login',
	REGISTER: 'register',
}

export default function Actions() {
	const cartItemCount = useAppSelector(selectCartItemCount)
	const currentUser = useAppSelector(selectCurrentUser)
	const isLoggedIn = useAppSelector(selectIsLoggedIn)

	const dispatch = useAppDispatch()

	const [mode, setMode] = useState(MODE.REGISTER)
	const [openDialog, setOpenDialog] = useState(false)

	const handleCloseDialog = () => {
		setOpenDialog(false)
	}

	const handleRegisterClick = () => {
		setMode(MODE.REGISTER)
		setOpenDialog(true)
	}

	const handleLoginClick = () => {
		setMode(MODE.LOGIN)
		setOpenDialog(true)
	}

	const handleLogoutClick = () => {
		removeCookie('refreshToken')
		removeFirstLogin()
		dispatch(authActions.userLogout())
	}

	return (
		<>
			<Stack
				direction="row"
				justifyContent="space-between"
				color="#fff"
				spacing={2}
				bgcolor="primary.dark"
				px={1}
				borderRadius={2}
			>
				<Stack direction="row" alignItems="center" spacing={1} py={1}>
					<CallIcon fontSize="large" />
					<Box>
						<Typography variant="body2">Mua hàng online</Typography>
						<Typography variant="h6">1900.1903</Typography>
					</Box>
					<Divider sx={{ bgcolor: '#fff' }} orientation="vertical" variant="middle" flexItem />
				</Stack>

				{/* Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. */}
				<div>
					<Tippy
						interactive
						offset={[0, -12]}
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
						<Stack direction="row" alignItems="center" spacing={1} py={1}>
							{!isLoggedIn && <AccountCircleIcon fontSize="large" />}
							{isLoggedIn && (
								<Box width={35} height={35} borderRadius="50%" overflow="hidden">
									<Image
										src={currentUser?.avatar || ''}
										alt={currentUser?.fullName}
										width={'100%'}
										height={'100%'}
										layout="responsive"
									/>
								</Box>
							)}
							{/* <AccountCircleIcon fontSize='large' /> */}
							{!isLoggedIn && (
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
							)}
							{isLoggedIn && (
								<Box>
									<Typography variant="body2" sx={{ cursor: 'pointer' }}>
										Xin chào
									</Typography>
									<Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={handleLoginClick}>
										{currentUser?.fullName}
									</Typography>
								</Box>
							)}
							<Divider sx={{ bgcolor: '#fff' }} orientation="vertical" variant="middle" flexItem />
						</Stack>
					</Tippy>
				</div>

				<Stack direction="row" alignItems="center" spacing={1} py={1}>
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
			</Stack>

			<Dialog
				open={openDialog}
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
