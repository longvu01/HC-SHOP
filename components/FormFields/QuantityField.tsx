import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { IconButton, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, ChangeEventHandler } from 'react'
import { useController } from 'react-hook-form'

export interface QuantityFieldProps {
	name: string
	control: any
	setValue: any
	label?: string
	disabled?: boolean
	onSubmit?: ({ quantity }: { quantity: number }) => void
}

export function QuantityField({
	name,
	control,
	setValue,
	label,
	disabled = false,
	onSubmit,
}: QuantityFieldProps) {
	const {
		field: { value, onChange, onBlur, ref },
		fieldState: { invalid, error },
	} = useController({ name, control })

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		onChange(e)
		onSubmit?.({ quantity: +e.target.value })
	}

	return (
		<Stack alignItems="center">
			<Stack direction="row" alignItems="center">
				<IconButton
					sx={{ border: '1px solid #ccc !important', borderRadius: '4px' }}
					onClick={() => {
						setValue(name, +value - 1, { shouldValidate: true })
						onSubmit?.({ quantity: +value - 1 })
					}}
				>
					<RemoveIcon />
				</IconButton>

				<TextField
					fullWidth
					margin="normal"
					variant="outlined"
					size="small"
					type="number"
					sx={{ my: 1 }}
					//
					value={value}
					onChange={handleChange}
					onBlur={onBlur}
					inputRef={ref}
					//
					name={name}
					label={label}
					disabled={disabled}
					//
					error={invalid}
					// helperText={error?.message}
				/>

				<IconButton
					sx={{ border: '1px solid #ccc !important', borderRadius: '4px' }}
					onClick={() => {
						setValue(name, +value + 1, { shouldValidate: true })
						onSubmit?.({ quantity: +value + 1 })
					}}
				>
					<AddIcon />
				</IconButton>
			</Stack>

			<Typography sx={{ color: '#ff1744' }}>{error?.message}</Typography>
		</Stack>
	)
}
