import { useState } from 'react';
import AuthFooterLink from '@/features/auth/components/auth-footer-link';
import AuthForm from '@/features/auth/components/auth-form';
import AuthHeader from '@/features/auth/components/auth-header';
import { useSignup } from '@/features/auth/hooks/useSignup';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import SignupAgreement from '@/pages/signup/components/signup-agreement';

function SignupPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const {
    emailApiError,
    submitError,
    isSubmitting,
    clearSignupErrors,
    clearSubmitError,
    handleSignup,
  } = useSignup();
  const isSubmitDisabled =
    isSubmitting ||
    !nickname ||
    !email ||
    !password ||
    !passwordConfirm ||
    !isAgreementChecked;

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    clearSignupErrors();
  };

  const handleChangePasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
    clearSubmitError();
  };

  const handleSubmit = async () => {
    await handleSignup({
      nickname,
      email,
      password,
      passwordConfirm,
      isAgreementChecked,
    });
  };

  return (
    <>
      <AuthHeader message="첫 방문을 환영합니다!" className="mb-9 md:mb-7.5" />
      <AuthForm onSubmit={handleSubmit}>
        <Input
          label="이름"
          type="text"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          placeholder="이름을 입력해 주세요"
        />
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="이메일을 입력해 주세요"
          errorMessage={emailApiError}
        />
        <Input
          id="signup-password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호를 입력해 주세요"
        />
        <Input
          id="signup-password-confirm"
          label="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={handleChangePasswordConfirm}
          placeholder="비밀번호를 다시 입력해 주세요"
          errorMessage={
            passwordConfirm && password !== passwordConfirm
              ? '비밀번호가 일치하지 않습니다.'
              : ''
          }
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
