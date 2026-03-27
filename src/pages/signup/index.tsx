import { useState } from 'react';
import AuthFooterLink from '@/features/auth/components/auth-footer-link';
import AuthForm from '@/features/auth/components/auth-form';
import AuthHeader from '@/features/auth/components/auth-header';
import { useSignup } from '@/features/auth/hooks/useSignup';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { useValidation } from '@/shared/hooks/useValidation';
import SignupAgreement from '@/pages/signup/components/signup-agreement';
import {
  validateAll,
  validateEmail,
  validateNickname,
  validatePassword,
} from '@/shared/utils/validators';

function SignupPage() {
  const nicknameField = useValidation({ validateFn: validateNickname });
  const emailField = useValidation({ validateFn: validateEmail });
  const passwordField = useValidation({ validateFn: validatePassword });
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const {
    emailApiError,
    submitError,
    isSubmitting,
    resetEmailApiError,
    resetSubmitError,
    handleSignup,
  } = useSignup();
  const isSubmitDisabled =
    isSubmitting ||
    !nicknameField.value ||
    !emailField.value ||
    !passwordField.value ||
    !passwordConfirm ||
    !isAgreementChecked;
  const passwordConfirmError =
    passwordConfirm && passwordField.value.trim() !== passwordConfirm.trim()
      ? '비밀번호가 일치하지 않습니다.'
      : '';

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    emailField.onChange(event);
    resetEmailApiError();
  };

  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    nicknameField.onChange(event);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    passwordField.onChange(event);
    resetSubmitError();
  };

  const handleChangePasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
    resetSubmitError();
  };

  const handleBlurPasswordConfirm = () => {
    setPasswordConfirm((prev) => prev.trim());
  };

  const handleSubmit = async () => {
    const { isAllValid } = validateAll({
      nickname: () => nicknameField.trigger(),
      email: () => emailField.trigger(),
      password: () => passwordField.trigger(),
    });

    if (!isAllValid || passwordField.value.trim() !== passwordConfirm.trim()) {
      return;
    }

    await handleSignup({
      nickname: nicknameField.value.trim(),
      email: emailField.value.trim(),
      password: passwordField.value.trim(),
      passwordConfirm: passwordConfirm.trim(),
      isAgreementChecked,
    });
  };

  return (
    <>
      <AuthHeader message="첫 방문을 환영합니다!" className="mb-9 md:mb-7.5" />
      <AuthForm onSubmit={handleSubmit}>
        <Input
          label="닉네임"
          type="text"
          value={nicknameField.value}
          onChange={handleChangeNickname}
          onBlur={nicknameField.onBlur}
          placeholder="닉네임을 입력해 주세요"
          errorMessage={nicknameField.error}
        />
        <Input
          label="이메일"
          type="email"
          value={emailField.value}
          onChange={handleChangeEmail}
          onBlur={emailField.onBlur}
          placeholder="이메일을 입력해 주세요"
          errorMessage={emailField.error || emailApiError}
        />
        <Input
          id="signup-password"
          label="비밀번호"
          type="password"
          value={passwordField.value}
          onChange={handleChangePassword}
          onBlur={passwordField.onBlur}
          placeholder="비밀번호를 입력해 주세요"
          errorMessage={passwordField.error}
        />
        <Input
          id="signup-password-confirm"
          label="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={handleChangePasswordConfirm}
          onBlur={handleBlurPasswordConfirm}
          placeholder="비밀번호를 다시 입력해 주세요"
          errorMessage={passwordConfirmError}
        />
        <SignupAgreement
          isChecked={isAgreementChecked}
          onChange={setIsAgreementChecked}
        />
        {submitError && (
          <p className="typo-md-regular text-error">{submitError}</p>
        )}
        <Button
          theme="primary"
          size="md"
          type="submit"
          disabled={isSubmitDisabled}
          className="mt-4 mb-6 w-full"
        >
          가입하기
        </Button>
      </AuthForm>
      <AuthFooterLink
        message="이미 회원이신가요?"
        linkText="로그인하기"
        to="/login"
      />
    </>
  );
}

export default SignupPage;
