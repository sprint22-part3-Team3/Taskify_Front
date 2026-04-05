import { ApiError } from '@/shared/apis/apiError';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/hooks/useToast';
import { signup } from '@/features/auth/apis/signup';
import type { SignupFormValues } from '@/features/auth/apis/auth.types';

const DUPLICATE_EMAIL_STATUS = 409;
const SIGNUP_ERROR_MESSAGE = '회원가입에 실패했습니다. 다시 시도해 주세요.';

export function useSignup() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [emailApiError, setEmailApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetEmailApiError = () => setEmailApiError('');

  const isInvalidSignupState = ({
    password,
    passwordConfirm,
    isAgreementChecked,
  }: SignupFormValues) => {
    return !isAgreementChecked || password !== passwordConfirm;
  };

  const getSignupErrorMessage = (error: unknown) => {
    return error instanceof Error ? error.message : SIGNUP_ERROR_MESSAGE;
  };

  const handleSignup = async ({
    nickname,
    email,
    password,
    passwordConfirm,
    isAgreementChecked,
  }: SignupFormValues) => {
    if (
      isInvalidSignupState({
        nickname,
        email,
        password,
        passwordConfirm,
        isAgreementChecked,
      })
    ) {
      return;
    }

    try {
      setIsSubmitting(true);
      await signup({
        nickname: nickname.trim(),
        email: email.trim(),
        password,
      });
      showToast({
        theme: 'success',
        title: '회원가입 완료',
        message: '회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.',
      });
      navigate('/login');
    } catch (error) {
      if (
        error instanceof ApiError &&
        error.status === DUPLICATE_EMAIL_STATUS
      ) {
        setEmailApiError(error.message);
        return;
      }

      const errorMessage = getSignupErrorMessage(error);
      showToast({
        theme: 'error',
        title: '회원가입 실패',
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    emailApiError,
    isSubmitting,
    resetEmailApiError,
    handleSignup,
  };
}
