import AuthFooterLink from '@/features/auth/components/auth-footer-link';
import AuthForm from '@/features/auth/components/auth-form';
import AuthHeader from '@/features/auth/components/auth-header';
import { useAuthFieldValidation } from '@/features/auth/hooks/useAuthFieldValidation';
import { useSignup } from '@/features/auth/hooks/useSignup';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import SignupAgreement from '@/pages/signup/components/signup-agreement';

function SignupPage() {
  const {
    emailApiError,
    submitError,
    isSubmitting,
    resetEmailApiError,
    resetSubmitError,
    handleSignup,
  } = useSignup();
  const {
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
  } = useAuthFieldValidation({
    includeNickname: true,
    includePasswordConfirm: true,
    includeAgreement: true,
    onEmailChange: resetEmailApiError,
    onPasswordChange: resetSubmitError,
    onPasswordConfirmChange: resetSubmitError,
  });
  const isDisabled = isSubmitting || isSubmitDisabled;

  const handleSubmit = async () => {
    if (!validateFields()) {
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
          disabled={isDisabled}
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
