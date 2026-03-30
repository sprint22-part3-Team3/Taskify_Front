import { useState, useContext, useEffect } from 'react';

import Title from '@/shared/components/title';
import Input from '@/shared/components/input';
import { Button } from '@/shared/components/button';
import ImageUploadBox from '@/shared/components/image-uploader';

import { updateUserMe } from '@/features/users/apis/updateUserMe';
import { uploadProfileImage } from '@/features/users/apis/uploadProfileImage';
import { UserContext } from '@/shared/context/user/userContext';

export default function ProfileForm() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext is not provided');
  }
  const { userProfile: user, setUserProfile } = userContext;
  const [nickname, setNickname] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    undefined
  );

  const isSaveDisabled =
    isSubmitting ||
    ((nickname.trim() === '' || nickname.trim() === user?.nickname) &&
      !selectedFile);

  useEffect(() => {
    if (user?.profileImageUrl) {
      setPreviewImageUrl(user.profileImageUrl);
    }
  }, [user?.profileImageUrl]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaveDisabled || !user) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      let profileImageUrl = user.profileImageUrl;

      if (selectedFile) {
        const res = await uploadProfileImage(selectedFile);
        profileImageUrl = res?.profileImageUrl ?? profileImageUrl;
      }

      const updated = await updateUserMe({
        nickname: nickname.trim() || user.nickname,
        profileImageUrl,
      });

      if (updated) setUserProfile(updated);

      setNickname('');
      setSelectedFile(null);
    } catch {
      setErrorMessage('프로필 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    setSelectedFile(file);
    setPreviewImageUrl(undefined);
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
            imageUrl={previewImageUrl}
            onFileSelect={handleFileSelect}
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
