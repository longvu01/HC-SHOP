import authApi from '@/api-client/authApi'
import { useAppDispatch } from '@/app/hooks'
import { AuthPayload } from '@/models'
import { handleErrorMessage, setCookie, setFirstLogin } from '@/utils'
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
			const authRes = await authApi.login(formValues)

			onClose()

			setCookie('refreshToken', authRes.refreshToken)

			setFirstLogin()

			dispatch(authActions.setUser({ user: authRes.user, accessToken: authRes.accessToken }))
		} catch (error) {
			toast.error(handleErrorMessage(error))
		}
	}

	return <LoginForm onSubmit={handleSubmit} />
}
