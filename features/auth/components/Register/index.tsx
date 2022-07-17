import authApi from '@/api-client/authApi';
import { AuthPayload } from '@/models';
import { handleErrorMessage } from '@/utils';
import { toast } from 'react-toastify';
import RegisterForm from '../RegisterForm';

export interface RegisterProps {
  onClose: () => void;
}

export function Register({ onClose }: RegisterProps) {
  const handleSubmit = async (formValues: AuthPayload) => {
    try {
      const res = await authApi.register(formValues);

      onClose();
      toast.success(res.message);
    } catch (error) {
      toast.error(handleErrorMessage(error));
    }
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}
