import { useState } from 'react';

import Title from '@/shared/components/title';
import Input from '@/shared/components/input';
import { Button } from '@/shared/components/button';
import ImageUploadBox from '@/shared/components/image-uploader';

import { useCurrentUser } from '@/features/users/hooks/useCurrentUser';
import { updateUserMe } from '@/features/users/apis/updateUserMe';
import { uploadProfileImage } from '@/features/users/apis/uploadProfileImage';

export default function ProfileForm() {
  const { user, isLoading } = useCurrentUser();
  const [nickname, setNickname] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isSaveDisabled =
    isLoading ||
    isSubmitting ||
    ((nickname.trim() === '' || nickname.trim() === user?.nickname) &&
      !selectedFile);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaveDisabled || !user) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      let profileImageUrl = user.profileImageUrl;

      // 이미지가 변경된 경우 먼저 업로드
      if (selectedFile) {
        const res = await uploadProfileImage(selectedFile);
        profileImageUrl = res?.profileImageUrl ?? profileImageUrl;
      }

      await updateUserMe({
        nickname: nickname.trim() || user.nickname,
        profileImageUrl,
      });
    } catch {
      setErrorMessage('프로필 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-1 w-71 rounded-xl bg-white p-4 md:mt-7 md:w-137 md:p-6 lg:w-2xl">
        <Title
          as="h3"
          size="2lg"
          weight="bold"
          className="mb-10 md:mb-6 md:text-2xl"
        >
          프로필
        </Title>

        <div className="w-full md:flex md:justify-between">
          <ImageUploadBox
            initialImage={user?.profileImageUrl}
            onFileChange={setSelectedFile}
          />
          <div className="mt-10 md:mt-0 md:w-69 lg:w-100">
            <Input
              label="이메일"
              name="email"
              type="text"
              value={user?.email ?? ''}
              readOnly
              labelClassName="text-md md:mt-0 md:text-lg"
              className="mb-4 focus:border-gray-200"
            />

            <Input
              label="닉네임"
              name="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={user?.nickname ?? '닉네임을 입력해주세요.'}
              labelClassName="text-md md:mt-0 md:text-lg"
            />
            {errorMessage && (
              <p className="text-error mt-1 text-sm">{errorMessage}</p>
            )}
            <Button
              theme="primary"
              type="submit"
              className="mt-6 h-13.5 w-full"
              disabled={isSaveDisabled}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
