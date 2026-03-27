import { useState } from 'react';
import AuthFooterLink from '@/features/auth/components/auth-footer-link';
import AuthForm from '@/features/auth/components/auth-form';
import AuthHeader from '@/features/auth/components/auth-header';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { submitError, isSubmitting, resetSubmitError, handleLogin } =
    useLogin();
  const isSubmitDisabled = isSubmitting || !email || !password;

  const handleSubmit = async () => {
    await handleLogin({ email, password });
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    resetSubmitError();
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    resetSubmitError();
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
          value={email}
          onChange={handleChangeEmail}
          placeholder="이메일을 입력해 주세요"
        />
        <Input
          id="login-password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="비밀번호를 입력해 주세요"
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
