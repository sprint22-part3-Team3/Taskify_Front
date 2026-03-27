import { ApiError } from '@/shared/apis/apiError';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '@/features/auth/apis/signup';
import type { SignupFormValues } from '@/features/auth/types/auth.types';

const DUPLICATE_EMAIL_STATUS = 409;
const SIGNUP_ERROR_MESSAGE = '회원가입에 실패했습니다. 다시 시도해 주세요.';

export function useSignup() {
  const navigate = useNavigate();
  const [emailApiError, setEmailApiError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetEmailApiError = () => setEmailApiError('');
  const resetSubmitError = () => setSubmitError('');

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
      resetSubmitError();
      await signup({
        nickname: nickname.trim(),
        email: email.trim(),
        password,
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

      setSubmitError(getSignupErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    emailApiError,
    submitError,
    isSubmitting,
    resetEmailApiError,
    resetSubmitError,
    handleSignup,
  };
}
