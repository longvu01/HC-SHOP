import { FormHelperText, FormLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Control, useController } from 'react-hook-form'

export interface RadioOption {
	label: string
	value: string | number
}

export interface RadioGroupFieldProps {
	name: string
	control: Control<any>
	label: string
	options: RadioOption[]
}

export function RadioGroupField({ name, control, label, options }: RadioGroupFieldProps) {
	const {
		field: { value, onChange, onBlur },
		fieldState: { invalid, error },
	} = useController({ name, control })

	return (
		<FormControl error={invalid}>
			<FormLabel>{label}</FormLabel>

			<RadioGroup
				row
				aria-labelledby={`${name} ${label}`}
				name={`${name} ${label}`}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			>
				{options.map((option) => (
					<FormControlLabel
						key={option.value}
						value={option.value}
						control={<Radio />}
						label={option.label}
					/>
				))}
			</RadioGroup>

			<FormHelperText>{error?.message}</FormHelperText>
		</FormControl>
	)
}
