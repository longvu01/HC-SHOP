import cityApi from '@/api-client/cityApi'
import userApi from '@/api-client/userApi'
import { useAppSelector } from '@/app/hooks'
import { InputField, RadioGroupField } from '@/components/FormFields'
import { SelectField, SelectOption } from '@/components/FormFields/SelectField'
import { selectCurrentUser, selectUserAccessToken } from '@/features/auth/authSlice'
import { handleErrorMessage } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, LinearProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export function ProfileTab() {
	const currentUser = useAppSelector(selectCurrentUser)
	const accessToken = useAppSelector(selectUserAccessToken)

	const [currentCityCode, setCurrentCityCode] = useState('')
	const [cityOptions, setCityOptions] = useState<SelectOption[]>([])
	const [districtOptions, setDistrictOptions] = useState<SelectOption[]>([])

	useEffect(() => {
		;(async () => {
			try {
				const cityRes = await cityApi.getAll()
				const cityOptions = cityRes.map((city) => ({
					label: city.name,
					value: city.code,
				}))

				setCityOptions(cityOptions)
			} catch (error) {
				toast.error(handleErrorMessage(error))
			}
		})()
	}, [])

	useEffect(() => {
		if (!currentCityCode) return
		;(async () => {
			try {
				const cityRes = await cityApi.getAll()

				const currentCity = cityRes.find((city) => city.code === +currentCityCode)

				if (!currentCity) {
					return toast.error('Không tìm thấy thành phố')
				}

				const districtOptions = currentCity.districts.map((district) => ({
					label: district.name,
					value: district.code,
				}))

				setDistrictOptions(districtOptions)
			} catch (error) {
				toast.error(handleErrorMessage(error))
			}
		})()
	}, [currentCityCode])

	const schema = yup.object().shape({
		fullName: yup
			.string()
			.required('Nhập tên hiển thị của bạn.')
			.test('should has at least two words', 'Tên đăng nhập cần tối thiểu 2 ký tự', (value) => {
				if (!value?.trim()) return false

				return value.split(' ').filter((x) => !!x).length >= 2
			}),
		phoneNumber: yup
			.string()
			.required('Nhập số điện thoại của bạn.')
			.matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
		gender: yup.string().required('Chọn giới tính của bạn').oneOf(['male', 'female']),
		email: yup
			.string()
			.required('Nhập email của bạn.')
			.email('Vui lòng nhập địa chỉ email hợp lệ.'),
		address: yup.string(),
	})

	const defaultValues = {
		fullName: currentUser?.fullName || '',
		phoneNumber: currentUser?.phoneNumber || '',
		email: currentUser?.email || '',
		gender: currentUser?.gender || 'male',
		address: currentUser?.address || '',
		cityCode: currentUser?.cityCode || undefined,
		districtCode: currentUser?.districtCode || undefined,
	}

	const {
		formState: { isSubmitting },
		handleSubmit,
		control,
	} = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	})

	// Handlers
	const handleFormSubmit = async (formValues: typeof defaultValues) => {
		try {
			const res = await userApi.update(formValues, accessToken)
			toast.success(res.message)
		} catch (error) {
			toast.error(handleErrorMessage(error))
		}
	}

	const handleCityChange = (city: string) => {
		setCurrentCityCode(city)
	}

	return (
		<Box>
			<Typography component="h2" variant="h6">
				Thông tin tài khoản
			</Typography>
			<Divider sx={{ py: 1 }} />

			{/* Profile form */}
			{isSubmitting && <LinearProgress />}
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<InputField name="fullName" label="Họ tên" control={control as Control<any>} />

				<InputField name="phoneNumber" label="Số điện thoại" control={control as Control<any>} />

				<InputField name="email" label="Email" control={control as Control<any>} />

				<RadioGroupField
					name="gender"
					label="Giới tính"
					options={[
						{
							label: 'Nam',
							value: 'male',
						},
						{
							label: 'Nữ',
							value: 'female',
						},
					]}
					control={control as Control<any>}
				/>

				<InputField name="address" label="Địa chỉ" control={control as Control<any>} />

				<SelectField
					name="cityCode"
					label="Tỉnh/thành phố"
					options={cityOptions}
					control={control as Control<any>}
					onChangeValue={handleCityChange}
				/>

				<SelectField
					name="districtCode"
					label="Quận/huyện"
					options={districtOptions}
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
					Cập nhật
				</Button>
			</form>
		</Box>
	)
}
