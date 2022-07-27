import userApi from '@/api-client/userApi'
import { useAppSelector } from '@/app/hooks'
import { PasswordField } from '@/components/FormFields'
import { selectUserAccessToken } from '@/features/auth/authSlice'
import { handleErrorMessage } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Typography } from '@mui/material'
import { Control, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

export function PasswordTab() {
	const accessToken = useAppSelector(selectUserAccessToken)

	const schema = yup.object().shape({
		oldPassword: yup
			.string()
			.required('Nhập mật khẩu hiện tại của bạn.')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
				'Mật khẩu cũ của bạn bao gồm ít nhất 8 ký tự, một chữ hoa, một chữ thường và một chữ số.'
			),
		newPassword: yup
			.string()
			.required('Nhập mật khẩu mới của bạn.')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
				'Mật khẩu cần bao gồm 8 ký tự, một chữ hoa, một chữ thường và một chữ số.'
			),
		retypeNewPassword: yup
			.string()
			.required('Xác nhận mật khẩu mới của bạn.')
			.oneOf([yup.ref('newPassword')], 'Mật khẩu nhập lại chưa khớp.'),
	})

	const defaultValues = {
		oldPassword: '',
		newPassword: '',
		retypeNewPassword: '',
	}

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
		reset,
	} = useForm({
		mode: 'onBlur',
		defaultValues,
		resolver: yupResolver(schema),
	})

	const handleFormSubmit = async (formValues: typeof defaultValues) => {
		try {
			const res = await userApi.update(formValues, accessToken)
			toast.success(res.message)
			reset()
		} catch (error) {
			toast.error(handleErrorMessage(error))
		}
	}

	return (
		<Box>
			<Typography component="h2" variant="h6">
				Thay đổi mật khẩu
			</Typography>
			<Divider sx={{ py: 1 }} />

			{/* Change password form */}

			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<PasswordField
					name="oldPassword"
					label="Mật khẩu hiện tại"
					control={control as Control<any>}
				/>

				<PasswordField name="newPassword" label="Mật khẩu mới" control={control as Control<any>} />

				<PasswordField
					name="retypeNewPassword"
					label="Nhập lại mật khẩu mới"
					control={control as Control<any>}
				/>

				<Button
					disabled={isSubmitting}
					type="submit"
					variant="contained"
					size="large"
					sx={{
						marginTop: '12px',
						bgcolor: '#ed1b24',
						px: 8,
						'&:hover': {
							bgcolor: '#ed1b24',
						},
					}}
				>
					Thay đổi
				</Button>
			</form>
		</Box>
	)
}
