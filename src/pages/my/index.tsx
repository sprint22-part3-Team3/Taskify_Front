import { useState } from 'react';
import { Button } from '@/shared/components/button';
import Label from '@/shared/components/input/label';
import InputField from '@/shared/components/input/input-field';
import PasswordField from '@/shared/components/input/password-field';
import Title from '@/shared/components/title';
import ImageUploadBox from '@/shared/components/image-uploader';

import { IcArrowLeft } from '@/shared/assets';

import { useNavigate } from 'react-router-dom';

function MyPage() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const navigate = useNavigate();

  const isPasswordMismatch =
    confirmNewPassword.length > 0 && newPassword !== confirmNewPassword;

  return (
    <div className="relative bg-gray-50">
      {/* 헤더 */}
      <div className="h-15 w-full bg-white md:h-17.5 lg:h-10" />
      {/* 사이드바 */}
      <div className="absolute top-0 left-0 h-dvh w-16.75 bg-white md:w-40 lg:w-75" />

      <div className="p-3 pt-4 pl-20 md:pt-4 md:pr-5 md:pl-44 lg:pt-12 lg:pl-80">
        <button
          onClick={() => navigate(-1)}
          className="mb-2 flex cursor-pointer items-center md:mb-7"
        >
          <div className="flex h-4.5 w-4.5 items-center justify-center md:h-5 md:w-5">
            <IcArrowLeft className="text-black-200" />
          </div>
          <div className="text-black-200 typo-md-medium md:typo-lg-medium md--line-height md:lg--line-height ml-2">
            돌아가기
          </div>
        </button>
        <div className="rounded-xl bg-white p-4 sm:w-full md:w-137 md:p-6 lg:w-2xl">
          <Title
            as="h2"
            size="2lg"
            weight="bold"
            className="mb-10 md:mb-6 md:text-2xl"
          >
            프로필
          </Title>
          <div className="md:flex md:justify-between">
            <ImageUploadBox />
            <div className="md:w-69 lg:w-100">
              <Label
                aria-label="이메일"
                htmlFor="email"
                className="gray-200 text-md mt-10 block md:mt-0 md:text-lg"
              >
                이메일
              </Label>
              <InputField
                type="email"
                placeholder="이메일을 입력해주세요"
                className="mt-2 mb-4"
              />
              <Label
                aria-label="닉네임"
                htmlFor="nickname"
                className="gray-200 text-md md:text-lg"
              >
                닉네임
              </Label>
              <InputField
                type="text"
                placeholder="닉네임을 입력해주세요"
                className="mt-2"
              />
              <Button
                theme="primary"
                type="submit"
                className="typo-lg-semibold mt-6 h-13.5 w-full"
              >
                저장
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-white p-4 sm:w-full md:mt-6 md:w-137 md:p-6 lg:w-2xl">
          <Title as="h2" size="2xl" weight="bold" className="mb-20 md:mb-6">
            비밀번호 변경
          </Title>
          <div>
            <Label
              aria-label="현재 비밀번호"
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
              aria-label="새 비밀번호"
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
              aria-label="새 비밀번호 확인"
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
            <Button
              theme="primary"
              type="submit"
              className="typo-md-regular mt-6 h-13.5 w-full"
            >
              변경
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
