import { useState } from 'react';
import Title from '@/shared/components/title';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';

export default function PasswordEditForm() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const isPasswordMismatch =
    confirmNewPassword.length > 0 && newPassword !== confirmNewPassword;

  return (
    <form>
      <div className="mt-4 w-71 rounded-xl bg-white p-4 md:mt-7 md:w-137 md:p-6 lg:w-2xl">
        <Title
          as="h3"
          size="2lg"
          weight="bold"
          className="mb-10 md:mb-6 md:text-2xl"
        >
          비밀번호 변경
        </Title>
        <div>
          <Input
            id="current-password"
            type="password"
            label="현재 비밀번호"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력"
            labelClassName="gray-200 text-md block md:text-lg"
          />
          <Input
            id="new-password"
            type="password"
            label="새 비밀번호"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="새 비밀번호를 입력"
            labelClassName="gray-200 text-md mt-4 block md:text-lg"
          />
          <Input
            id="new-password-confirm"
            type="password"
            label="새 비밀번호 확인"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            placeholder="새 비밀번호를 입력"
            labelClassName="gray-200 text-md mt-4 block md:text-lg"
          />

          {isPasswordMismatch && (
            <p className="text-error mt-1 text-sm">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          <Button theme="primary" type="submit" className="mt-6 h-13.5 w-full">
            변경
          </Button>
        </div>
      </div>
    </form>
  );
}
