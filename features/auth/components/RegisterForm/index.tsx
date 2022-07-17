import { InputField, PasswordField } from '@/components/FormFields';
import { AuthPayload } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, LinearProgress } from '@mui/material';
import { Control, useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface RegisterFormProps {
  onSubmit?: (formValues: AuthPayload) => void;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Nhập tên hiển thị của bạn.')
      .test('should has at least two words', 'Tên đăng nhập cần tối thiểu 2 ký tự', (value) => {
        if (!value?.trim()) return false;

        return value.split(' ').filter((x) => !!x).length >= 2;
      }),
    email: yup
      .string()
      .required('Nhập email của bạn.')
      .email('Vui lòng nhập địa chỉ email hợp lệ.'),
    password: yup
      .string()
      .required('Nhập mật khẩu của bạn.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Mật khẩu cần bao gồm 8 ký tự, một chữ hoa, một chữ thường và một chữ số.'
      ),
    retypePassword: yup
      .string()
      .required('Xác nhận mật khẩu của bạn.')
      .oneOf([yup.ref('password')], 'Mật khẩu nhập lại chưa khớp.'),
  });

  const initialValues: AuthPayload = {
    fullName: '',
    email: '',
    password: '',
    retypePassword: '',
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: AuthPayload) => {
    await onSubmit?.(formValues);
  };

  return (
    <Box>
      {isSubmitting && <LinearProgress />}

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name='fullName' label='Tên hiển thị' control={control as Control<any>} />
        <InputField name='email' label='Email của bạn' control={control as Control<any>} />
        <PasswordField name='password' label='Mật khẩu' control={control as Control<any>} />
        <PasswordField
          name='retypePassword'
          label='Nhập lại mật khẩu'
          control={control as Control<any>}
        />

        <Button
          disabled={isSubmitting}
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          size='large'
          sx={{ marginTop: '12px' }}
        >
          Tạo tài khoản
        </Button>
      </form>
    </Box>
  );
}
