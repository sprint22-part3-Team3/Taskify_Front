import { useState } from 'react';
import AuthFooterLink from '@/features/auth/components/auth-footer-link';
import AuthForm from '@/features/auth/components/auth-form';
import AuthHeader from '@/features/auth/components/auth-header';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import Label from '@/shared/components/input/label';
import PasswordField from '@/shared/components/input/password-field';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // TODO: 이메일/비밀번호 유효성 검사 후 로그인 API 호출
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
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일을 입력해 주세요"
        />
        {/* TODO: Input 컴포넌트가 PasswordField도 렌더링하도록 확장해서
            라벨과 비밀번호 입력을 한 컴포넌트로 묶도록 리팩토링 */}
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="login-password">비밀번호</Label>
          <PasswordField
            id="login-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>
        <Button
          theme="primary"
          size="md"
          type="submit"
          disabled={!email || !password}
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
