import { useState } from 'react';
import { Button } from '@/shared/components/button';
import Label from '@/shared/components/input/label';
import InputField from '@/shared/components/input/input-field';
import Input from '@/shared/components/input';
import PasswordField from '@/shared/components/input/password-field';
import Title from '@/shared/components/title';
import ImageUploadBox from '@/shared/components/image-uploader';
import BackButton from '@/shared/components/back-button';

function MyPage() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const isPasswordMismatch =
    confirmNewPassword.length > 0 && newPassword !== confirmNewPassword;

  return (
    <form className="p-3 pt-4 pl-3 md:pt-4 md:pr-5 md:pl-4 lg:pt-5 lg:pl-5">
      <BackButton />
      <div className="mt-1 rounded-xl bg-white p-4 sm:w-full md:mt-7 md:w-137 md:p-6 lg:w-2xl">
        <Title
          as="h3"
          size="2lg"
          weight="bold"
          className="mb-10 md:mb-6 md:text-2xl"
        >
          프로필
        </Title>
        <div className="md:flex md:justify-between">
          <ImageUploadBox />
          <div className="md:w-69 lg:w-100">
            <Input
              label="이메일"
              type="text"
              readOnly
              labelClassName="gray-200 text-md mt-10 block md:mt-0 md:text-lg"
              className="mb-4"
            />
            <Input
              label="닉네임"
              type="text"
              labelClassName="gray-200 text-md mt-10 block md:mt-0 md:text-lg"
            />
            <Button
              theme="primary"
              type="submit"
              className="mt-6 h-13.5 w-full"
            >
              저장
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-white p-4 sm:w-full md:mt-6 md:w-137 md:p-6 lg:w-2xl">
        <Title as="h3" size="2xl" weight="bold" className="mb-20 md:mb-6">
          비밀번호 변경
        </Title>
        <div>
          <Label
            htmlFor="current-password"
            className="gray-200 text-md mb-2 block md:text-lg"
          >
            현재 비밀번호
          </Label>
          <PasswordField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력"
          />
          <Label
            htmlFor="new-password"
            className="gray-200 text-md mt-4 mb-2 block md:text-lg"
          >
            새 비밀번호
          </Label>
          <PasswordField
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="새 비밀번호를 입력"
          />
          <Label
            htmlFor="new-password-confirm"
            className="gray-200 text-md mt-4 mb-2 block md:text-lg"
          >
            새 비밀번호 확인
          </Label>
          <PasswordField
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            placeholder="새 비밀번호를 입력"
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

export default MyPage;
