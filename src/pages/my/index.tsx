import { useState } from 'react';
import { Button } from '@/shared/components/button';
import Label from '@/shared/components/input/label';
import InputField from '@/shared/components/input/input-field';
import PasswordField from '@/shared/components/input/password-field';
import Title from '@/shared/components/title';
import ImageUploadBox from '@/shared/components/image-uploader';

function MyPage() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const isPasswordMismatch =
    confirmNewPassword.length > 0 && newPassword !== confirmNewPassword;

  return (
    <div className="bg-gray-50">
      {/* 헤더 */}
      {/* 사이드바 */}
      {/* 돌아가기 버튼 */}
      <div>
        <div className="w-2xl rounded-xl bg-white p-6">
          <Title as="h2" size="2xl" weight="bold" className="mb-6">
            프로필
          </Title>
          <div className="flex justify-between">
            <ImageUploadBox />
            <div className="w-100">
              <Label
                aria-label="이메일"
                htmlFor="email"
                className="gray-200 text-lg"
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
                className="gray-200 text-lg"
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
        <div className="mt-6 w-2xl rounded-xl bg-white p-6">
          <Title as="h2" size="2xl" weight="bold" className="mb-6">
            비밀번호 변경
          </Title>
          <div>
            <Label
              aria-label="현재 비밀번호"
              htmlFor="current-password"
              className="gray-200 mb-2 block text-lg"
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
              className="gray-200 mt-4 mb-2 block text-lg"
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
              className="gray-200 mt-4 mb-2 block text-lg"
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
