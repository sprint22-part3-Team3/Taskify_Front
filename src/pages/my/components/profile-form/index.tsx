import { useState, useContext, useEffect } from 'react';

import Title from '@/shared/components/title';
import Input from '@/shared/components/input';
import { Button } from '@/shared/components/button';
import ImageUploadBox from '@/shared/components/image-uploader';

import { updateUserMe, uploadProfileImage } from '@/features/users/apis/users';
import { UserContext } from '@/shared/context/user/userContext';
import { NICKNAME_RULES } from '@/shared/utils/validators/validators.constants';

import { useValidation } from '@/shared/hooks/useValidation';
import { validateNickname } from '@/shared/utils/validators';

export default function ProfileForm() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext is not provided');
  }
  const { userProfile: user, setUserProfile } = userContext;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    undefined
  );

  const nicknameField = useValidation({
    validateFn: validateNickname,
    initialValue: user?.nickname ?? '', // 추가
  });
  const { setValue: setNicknameValue } = nicknameField;
  const isImageRemoved = !previewImageUrl && !!user?.profileImageUrl;

  const isSaveDisabled =
    isSubmitting ||
    (nicknameField.value.trim() === user?.nickname &&
      !selectedFile &&
      !isImageRemoved) ||
    !!nicknameField.error;

  useEffect(() => {
    if (user?.profileImageUrl) {
      setPreviewImageUrl(user.profileImageUrl);
    }
    if (user?.nickname) {
      setNicknameValue(user.nickname);
    }
  }, [user?.profileImageUrl, user?.nickname, setNicknameValue]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaveDisabled || !user) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      let profileImageUrl: string | null = user.profileImageUrl ?? null;

      if (selectedFile) {
        const res = await uploadProfileImage(selectedFile);
        profileImageUrl = res?.profileImageUrl ?? profileImageUrl;
      } else if (isImageRemoved) {
        profileImageUrl = null;
      }

      const updated = await updateUserMe({
        nickname: nicknameField.value.trim() || user.nickname,
        profileImageUrl,
      });

      if (updated) setUserProfile(updated);

      nicknameField.setValue(updated?.nickname ?? user.nickname);
      setSelectedFile(null);
    } catch {
      setErrorMessage('프로필 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNicknameBlur = () => {
    if (nicknameField.value.trim() === '') {
      nicknameField.setValue(user?.nickname ?? '');
    } else {
      nicknameField.onBlur();
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setPreviewImageUrl(undefined);
      return;
    }
    setSelectedFile(file);
    setPreviewImageUrl(undefined);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mt-1 w-full rounded-xl bg-white p-4 md:mt-7 md:w-137 md:p-6 lg:w-2xl">
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
              className="mb-4 cursor-default bg-gray-50 text-gray-300 focus:border-gray-200"
            />

            <Input
              label="닉네임"
              name="nickname"
              type="text"
              value={nicknameField.value}
              onChange={nicknameField.onChange}
              onBlur={handleNicknameBlur}
              errorMessage={nicknameField.error}
              placeholder={user?.nickname ?? '닉네임을 입력해주세요.'}
              labelClassName="text-md md:mt-0 md:text-lg"
              maxLength={NICKNAME_RULES.MAX_LENGTH}
            />
            {errorMessage && (
              <p className="text-error mt-1 text-sm">{errorMessage}</p>
            )}
            <Button
              theme="primary"
              type="submit"
              className="mt-6 h-13.5 w-full"
              disabled={isSaveDisabled}
              isLoading={isSubmitting}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
