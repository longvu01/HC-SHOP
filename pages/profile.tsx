import { useAppSelector } from '@/app/hooks'
import { Seo } from '@/components/Common'
import PageBreadCrumbs from '@/components/Common/PageBreadCrumbs'
import { selectCurrentUser, selectIsLoggedIn } from '@/features/auth/authSlice'
import { ChangeAvatar, OrderTab, PasswordTab, ProfileTab } from '@/features/profile'
import { MainLayout } from '@/layouts'
import { NextPageWithLayout } from '@/models'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import LockIcon from '@mui/icons-material/Lock'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const breadCrumbsData = [
	{
		title: 'Trang chủ',
		href: '/',
	},
	{
		title: 'Tài khoản',
		href: '/profile',
	},
]

const userTabs = [
	{
		title: 'Thông tin tài khoản',
		tab: 'main',
		icon: <AccountCircleIcon />,
		component: ProfileTab,
	},
	{
		title: 'Đơn hàng của tôi',
		tab: 'myOrder',
		icon: <FormatListNumberedIcon />,
		component: OrderTab,
	},
	{
		title: 'Thay đổi mật khẩu',
		tab: 'myPassword',
		icon: <LockIcon />,
		component: PasswordTab,
	},
]

const ProfilePage: NextPageWithLayout = () => {
	const router = useRouter()

	const isLoggedIn = useAppSelector(selectIsLoggedIn)
	const currentUser = useAppSelector(selectCurrentUser)

	const {
		query: { tab = 'main' },
	} = useRouter()

	useEffect(() => {
		// Do nothing if running on server
		if (typeof window === 'undefined') return

		const localStorageStatus = JSON.parse(localStorage.getItem('status') || '{}')

		if (!isLoggedIn && !localStorageStatus.firstLogin) router.replace('/')
	}, [isLoggedIn, router])

	if (!isLoggedIn) return null

	const currentTab = userTabs.find((userTab) => userTab.tab === tab)
	if (!currentTab) return null

	const CurrentTabComponent = currentTab.component

	return (
		<Box component="section" pb={{ xs: 7, md: 9 }}>
			<Seo title="Tài khoản" />

			<Container maxWidth="xl">
				<PageBreadCrumbs data={breadCrumbsData} />

				<Stack direction="row" spacing={2}>
					{/* Left */}
					<Box sx={{ width: '250px' }} p={1}>
						<Stack direction="row" spacing={3}>
							<ChangeAvatar
								fullName={currentUser?.fullName || ''}
								avatar={currentUser?.avatar || ''}
							/>

							<Box>
								<Typography variant="body2">Tài khoản của</Typography>
								<Typography variant="h6" fontWeight="bold">
									{currentUser?.fullName}
								</Typography>
							</Box>
						</Stack>

						<Box>
							<nav aria-label="user tab">
								<List>
									{userTabs.map(({ title, tab, icon }) => (
										<Link key={title} href={{ pathname: '/profile', query: { tab } }} passHref>
											<ListItem disablePadding>
												<ListItemButton>
													<ListItemIcon>{icon}</ListItemIcon>
													<ListItemText primary={title} />
												</ListItemButton>
											</ListItem>
										</Link>
									))}
								</List>
							</nav>
						</Box>
					</Box>

					{/* Right */}
					<Paper elevation={0} sx={{ p: 2, flex: 1 }}>
						<CurrentTabComponent />
					</Paper>
				</Stack>
			</Container>
		</Box>
	)
}

ProfilePage.Layout = MainLayout

export default ProfilePage
