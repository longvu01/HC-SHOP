import { InputField, PasswordField } from '@/components/FormFields';
import { AuthPayload } from '@/models';
import { Box, Button, LinearProgress } from '@mui/material';
import { Control, useForm } from 'react-hook-form';

export interface LoginFormProps {
  onSubmit?: (formValues: AuthPayload) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const initialValues: AuthPayload = {
    email: '',
    password: '',
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({ defaultValues: initialValues });

  const handleFormSubmit = async (formValues: AuthPayload) => {
    await onSubmit?.(formValues);
  };

  return (
    <Box>
      {isSubmitting && <LinearProgress />}

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name='email' label='Email' control={control as Control<any>} />
        <PasswordField name='password' label='Password' control={control as Control<any>} />

        <Button
          disabled={isSubmitting}
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          size='large'
          sx={{ marginTop: '12px' }}
        >
          Đăng nhập
        </Button>
      </form>
    </Box>
  );
}
