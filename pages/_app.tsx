import { EmptyLayout } from '@/layouts'
import { AppPropsWithLayout } from '@/models'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import authApi from '@/api-client/authApi'
import { useAppDispatch } from '@/app/hooks'
import { wrapper } from '@/app/store'
import { authActions } from '@/features/auth/authSlice'
import { createEmotionCache, handleErrorMessage, removeFirstLogin, theme } from '@/utils'
import { CssBaseline } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'
import { useEffect } from 'react'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const dispatch = useAppDispatch()

	useEffect(() => {
		// Check if running on client
		if (typeof window === 'undefined') return

		const localStorageStatus = JSON.parse(localStorage.getItem('status') || '{}')
		if (!localStorageStatus.firstLogin)
			return // If first login get user token + info form accessToken api route
		;(async () => {
			try {
				const res = await authApi.getInfo()

				dispatch(authActions.setUser(res))
			} catch (error) {
				// Remove firstLogin key so user need to login to get new token
				removeFirstLogin()
				toast.error(handleErrorMessage(error))
			}
		})()
	}, [dispatch])

	const Layout = Component.Layout ?? EmptyLayout

	return (
		<CacheProvider value={clientSideEmotionCache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<Layout>
					<Component {...pageProps} />
				</Layout>
				<ToastContainer autoClose={3000} />
			</ThemeProvider>
		</CacheProvider>
	)
}

export default wrapper.withRedux(MyApp)
// export default MyApp
