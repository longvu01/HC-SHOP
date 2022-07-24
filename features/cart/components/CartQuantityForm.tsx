import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { QuantityField } from '../../../components/FormFields'

export interface CartQuantityFormProps {
	initialValues?: { quantity: number }
	onSubmit: (quantity: number) => void
	children?: ReactNode
}

export function CartQuantityForm({
	initialValues = { quantity: 1 },
	onSubmit,
	children,
}: CartQuantityFormProps) {
	const schema = yup.object().shape({
		quantity: yup.number().required('Xin mời chọn số lượng').typeError('Nhập số hợp lệ'),
	})

	const { handleSubmit, setValue, control } = useForm({
		defaultValues: initialValues,
		resolver: yupResolver(schema),
	})

	const handleFormSubmit = ({ quantity }: { quantity: number }) => {
		onSubmit(quantity)
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Stack direction="row" alignItems="flex-start" spacing={1}>
				<QuantityField
					name="quantity"
					setValue={setValue}
					control={control}
					onSubmit={handleFormSubmit}
				/>

				{children}
			</Stack>
		</form>
	)
}
