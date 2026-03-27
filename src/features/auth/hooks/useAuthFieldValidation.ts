import { useState, type ChangeEvent } from 'react';
import { useValidation } from '@/shared/hooks/useValidation';
import {
  validateAll,
  validateEmail,
  validateNickname,
  validatePassword,
} from '@/shared/utils/validators';

type UseAuthFieldValidationOptions = {
  includeNickname?: boolean;
  includePasswordConfirm?: boolean;
  includeAgreement?: boolean;
  onEmailChange?: () => void;
  onPasswordChange?: () => void;
  onPasswordConfirmChange?: () => void;
};

export function useAuthFieldValidation({
  includeNickname = false,
  includePasswordConfirm = false,
  includeAgreement = false,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
}: UseAuthFieldValidationOptions) {
  const nicknameField = useValidation({ validateFn: validateNickname });
  const emailField = useValidation({ validateFn: validateEmail });
  const passwordField = useValidation({ validateFn: validatePassword });
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const passwordConfirmError =
    includePasswordConfirm &&
    passwordConfirm &&
    passwordField.value.trim() !== passwordConfirm.trim()
      ? '비밀번호가 일치하지 않습니다.'
      : '';

  const isSubmitDisabled =
    !emailField.value ||
    !passwordField.value ||
    (includeNickname && !nicknameField.value) ||
    (includePasswordConfirm && !passwordConfirm) ||
    (includeAgreement && !isAgreementChecked);

  const handleChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    nicknameField.onChange(event);
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    emailField.onChange(event);
    onEmailChange?.();
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    passwordField.onChange(event);
    onPasswordChange?.();
  };

  const handleChangePasswordConfirm = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
    onPasswordConfirmChange?.();
  };

  const handleBlurPasswordConfirm = () => {
    setPasswordConfirm((prev) => prev.trim());
  };

  const validateFields = () => {
    const validators = {
      email: () => emailField.trigger(),
      password: () => passwordField.trigger(),
      ...(includeNickname
        ? {
            nickname: () => nicknameField.trigger(),
          }
        : {}),
    };

    const { isAllValid } = validateAll(validators);

    if (!isAllValid) {
      return false;
    }

    if (includePasswordConfirm) {
      return passwordField.value.trim() === passwordConfirm.trim();
    }

    return true;
  };

  return {
    nicknameField,
    emailField,
    passwordField,
    passwordConfirm,
    isAgreementChecked,
    isSubmitDisabled,
    passwordConfirmError,
    setIsAgreementChecked,
    handleChangeNickname,
    handleChangeEmail,
    handleChangePassword,
    handleChangePasswordConfirm,
    handleBlurPasswordConfirm,
    validateFields,
  };
}
