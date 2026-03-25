import { useState } from 'react';
import AuthFooterLink from '@/features/auth/components/auth-footer-link';
import AuthForm from '@/features/auth/components/auth-form';
import AuthHeader from '@/features/auth/components/auth-header';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import Label from '@/shared/components/input/label';
import PasswordField from '@/shared/components/input/password-field';
import SignupAgreement from '@/pages/signup/components/signup-agreement';

function SignupPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const handleSubmit = () => {
    // TODO: 입력값 유효성 검사와 약관 동의 여부 확인 후 회원가입 API 호출
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
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일을 입력해 주세요"
        />
        {/* TODO: Input 컴포넌트가 PasswordField도 렌더링하도록 확장해서
            라벨과 비밀번호 입력을 한 컴포넌트로 묶도록 리팩토링 */}
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="signup-password">비밀번호</Label>
          <PasswordField
            id="signup-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="signup-password-confirm">비밀번호 확인</Label>
          <PasswordField
            id="signup-password-confirm"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            placeholder="비밀번호를 다시 입력해 주세요"
          />
        </div>
        <SignupAgreement
          isChecked={isAgreementChecked}
          onChange={setIsAgreementChecked}
        />
        <Button
          theme="primary"
          size="md"
          type="submit"
          disabled={
            !nickname ||
            !email ||
            !password ||
            !passwordConfirm ||
            !isAgreementChecked
          }
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
