import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { QuantityField } from '../FormFields'

export interface AddQuantityFormProps {
	initialValues?: { quantity: number }
	onSubmit: (quantity: number) => void
	children?: ReactNode
}

export default function AddQuantityForm({
	initialValues = { quantity: 1 },
	onSubmit,
	children,
}: AddQuantityFormProps) {
	const schema = yup.object().shape({
		quantity: yup.number().required('Xin mời chọn số lượng').typeError('Nhập số hợp lệ'),
	})

	const { handleSubmit, setValue, control, reset } = useForm({
		mode: 'onChange',
		defaultValues: initialValues,
		resolver: yupResolver(schema),
	})

	const handleFormSubmit = ({ quantity }: { quantity: number }) => {
		onSubmit(quantity)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Stack direction="row" alignItems="flex-start" spacing={1}>
				<QuantityField name="quantity" setValue={setValue} control={control} />

				{children}
			</Stack>
		</form>
	)
}
