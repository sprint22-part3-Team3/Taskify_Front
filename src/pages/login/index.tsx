import AuthFooterLink from '@/features/auth/components/auth-footer-link';
import AuthForm from '@/features/auth/components/auth-form';
import AuthHeader from '@/features/auth/components/auth-header';
import { useAuthFieldValidation } from '@/features/auth/hooks/useAuthFieldValidation';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';

function LoginPage() {
  const { submitError, isSubmitting, resetSubmitError, handleLogin } =
    useLogin();
  const {
    emailField,
    passwordField,
    isSubmitDisabled,
    handleChangeEmail,
    handleChangePassword,
    validateFields,
  } = useAuthFieldValidation({
    onEmailChange: resetSubmitError,
    onPasswordChange: resetSubmitError,
  });
  const isDisabled = isSubmitting || isSubmitDisabled;

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    await handleLogin({
      email: emailField.value.trim(),
      password: passwordField.value.trim(),
    });
  };

  return (
    <>
      <AuthHeader
        message="오늘도 만나서 반가워요!"
        className="mb-9 md:mb-7.5"
      />
      <AuthForm onSubmit={handleSubmit}>
        <Input
          label="이메일"
          type="email"
          value={emailField.value}
          onChange={handleChangeEmail}
          onBlur={emailField.onBlur}
          placeholder="이메일을 입력해 주세요"
          errorMessage={emailField.error}
        />
        <Input
          id="login-password"
          label="비밀번호"
          type="password"
          value={passwordField.value}
          onChange={handleChangePassword}
          onBlur={passwordField.onBlur}
          placeholder="비밀번호를 입력해 주세요"
          errorMessage={passwordField.error}
        />
        {submitError && (
          <p className="typo-md-regular text-error">{submitError}</p>
        )}
        <Button
          theme="primary"
          size="md"
          type="submit"
          disabled={isDisabled}
          isLoading={isSubmitting}
          className="mt-4 mb-6 w-full"
        >
          로그인
        </Button>
      </AuthForm>
      <AuthFooterLink
        message="아직 회원이 아니신가요?"
        linkText="회원가입하기"
        to="/signup"
      />
    </>
  );
}

export default LoginPage;
