import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '@/shared/apis/apiError';
import { login } from '@/features/auth/apis/login';
import useAuthContext from '@/features/auth/hooks/useAuthContext';
import type { LoginFormValues } from '@/features/auth/types/auth.types';

const LOGIN_ERROR_MESSAGE = '로그인에 실패했습니다. 다시 시도해 주세요.';

export function useLogin() {
  const navigate = useNavigate();
  const { setAuthToken } = useAuthContext();
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetSubmitError = () => setSubmitError('');

  const getLoginErrorMessage = (error: unknown) => {
    if (error instanceof ApiError) {
      return error.message;
    }

    return error instanceof Error ? error.message : LOGIN_ERROR_MESSAGE;
  };

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      resetSubmitError();

      const response = await login({
        email: email.trim(),
        password,
      });

      setAuthToken(response.accessToken);
      navigate('/mydashboard');
    } catch (error) {
      setSubmitError(getLoginErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitError,
    isSubmitting,
    resetSubmitError,
    handleLogin,
  };
}
