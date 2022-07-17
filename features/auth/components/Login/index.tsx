import authApi from '@/api-client/authApi'
import { useAppDispatch } from '@/app/hooks'
import { AuthPayload } from '@/models'
import { handleErrorMessage, setCookie } from '@/utils'
import { toast } from 'react-toastify'
import { authActions } from '../../authSlice'
import LoginForm from '../LoginForm'

export interface LoginProps {
	onClose: () => void
}

export function Login({ onClose }: LoginProps) {
	const dispatch = useAppDispatch()

	const handleSubmit = async (formValues: AuthPayload) => {
		try {
			const res = await authApi.login(formValues)

			onClose()

			setCookie('refreshToken', res.refreshToken)

			localStorage.setItem('status', JSON.stringify({ firstLogin: true }))

			dispatch(authActions.setUser({ user: res.user, accessToken: res.accessToken }))
		} catch (error) {
			toast.error(handleErrorMessage(error))
		}
	}

	return <LoginForm onSubmit={handleSubmit} />
}
