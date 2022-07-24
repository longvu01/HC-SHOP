import authApi from '@/api-client/authApi'
import { useAppDispatch } from '@/app/hooks'
import { AuthPayload } from '@/models'
import { handleErrorMessage, setCookie, setFirstLogin } from '@/utils'
import { toast } from 'react-toastify'
import { authActions } from '../../authSlice'
import RegisterForm from '../RegisterForm'

export interface RegisterProps {
	onClose: () => void
}

export function Register({ onClose }: RegisterProps) {
	const dispatch = useAppDispatch()

	const handleSubmit = async (formValues: AuthPayload) => {
		try {
			const res = await authApi.register(formValues)

			onClose()

			setCookie('refreshToken', res.refreshToken)

			setFirstLogin()

			dispatch(authActions.setUser({ user: res.user, accessToken: res.accessToken }))
			toast.success(res.message)
		} catch (error) {
			toast.error(handleErrorMessage(error))
		}
	}

	return <RegisterForm onSubmit={handleSubmit} />
}
