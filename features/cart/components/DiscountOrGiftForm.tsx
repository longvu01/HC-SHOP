import { InputField } from '@/components/FormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, TextField } from '@mui/material'
import { Control, useForm } from 'react-hook-form'
import * as yup from 'yup'

export interface DiscountOrGiftFormProps {}

export function DiscountOrGiftForm(props: DiscountOrGiftFormProps) {
	const { handleSubmit, control } = useForm({
		defaultValues: { discountOrGift: '' },
	})

	const handleFormSubmit = ({ discountOrGift }: { discountOrGift: string }) => {
		console.log({ discountOrGift })
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Stack direction="row" alignItems="center">
				<InputField
					name="discountOrGift"
					label="Mã giảm giá/ quà tặng"
					control={control as Control<any, any>}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ whiteSpace: 'nowrap', height: '100%', mt: 1 }}
				>
					Áp dụng
				</Button>
			</Stack>
		</form>
	)
}
