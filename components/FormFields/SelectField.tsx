import { FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { Control, useController } from 'react-hook-form'

export interface SelectOption {
	label: string
	value: string | number
}

export interface SelectFieldProps {
	name: string
	control: Control<any>
	label: string
	options: SelectOption[]
	onChangeValue?: (value: string) => void
}

export function SelectField({ name, control, label, options, onChangeValue }: SelectFieldProps) {
	const {
		field: { value, onChange, onBlur },
		fieldState: { invalid, error },
	} = useController({ name, control })

	const handleChange = (e: SelectChangeEvent) => {
		onChangeValue?.(e.target.value)
		onChange(e)
	}

	const isValueExistInOption = options.some((option) => option.value === value)

	return (
		<FormControl fullWidth size="small" margin="normal" error={invalid}>
			<InputLabel>{label}</InputLabel>

			<Select
				labelId={`${name} ${label}`}
				id={`${name} ${label}`}
				value={isValueExistInOption ? value : ''}
				label={label}
				onChange={handleChange}
				onBlur={onBlur}
			>
				{options.length === 0 && (
					<MenuItem value="">
						<em>-- Lựa chọn --</em>
					</MenuItem>
				)}

				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>

			<FormHelperText>{error?.message}</FormHelperText>
		</FormControl>
	)
}
