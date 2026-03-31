import { useState } from 'react';
import Title from '@/shared/components/title';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';

import { useValidation } from '@/shared/hooks/useValidation';
import { validatePassword } from '@/shared/utils/validators';

import { updatePassword } from '@/features/auth/apis/updatePassword';

import { ApiError } from '@/shared/apis/apiError';
import ChangePasswordCompleteModal from '../change-password-complete-modal';
import { useModal } from '@/shared/hooks/useModal';

export default function PasswordEditForm() {
  const {
    isOpen: isSuccessModalOpen,
    openModal: handleOpenSuccessModal,
    closeModal: handleCloseSuccessModal,
  } = useModal();

  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const newPasswordField = useValidation({ validateFn: validatePassword });

  const isPasswordMismatch =
    confirmPassword.length > 0 && newPasswordField.value !== confirmPassword;

  const isSubmitDisabled =
    !currentPassword.trim() ||
    !newPasswordField.isValid ||
    isPasswordMismatch ||
    confirmPassword.length === 0 ||
    isSubmitting;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await updatePassword({
        password: currentPassword.trim(),
        newPassword: newPasswordField.value,
      });

      // 성공 시 초기화
      handleOpenSuccessModal();
      setCurrentPassword('');
      newPasswordField.reset();
      setConfirmPassword('');
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="비밀번호를 입력"
            labelClassName="text-md md:text-lg"
          />
          <Input
            id="new-password"
            type="password"
            label="새 비밀번호"
            value={newPasswordField.value}
            onChange={newPasswordField.onChange}
            onBlur={newPasswordField.onBlur}
            errorMessage={newPasswordField.error}
            placeholder="새 비밀번호를 입력"
            labelClassName="text-md mt-4 md:text-lg"
            className={
              newPasswordField.error ? 'border-error focus:border-error' : ''
            }
          />
          <Input
            id="new-password-confirm"
            type="password"
            label="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호를 입력"
            errorMessage={
              isPasswordMismatch ? '비밀번호가 일치하지 않습니다.' : ''
            }
            className={
              isPasswordMismatch ? 'border-error focus:border-error' : ''
            }
            labelClassName="text-md mt-4 md:text-lg"
          />
          {errorMessage && (
            <p className="text-error text-md mt-1">{errorMessage}</p>
          )}
          <Button
            theme="primary"
            type="submit"
            className="mt-6 h-13.5 w-full"
            disabled={isSubmitDisabled}
          >
            변경
          </Button>
          <ChangePasswordCompleteModal
            isOpen={isSuccessModalOpen}
            onClose={handleCloseSuccessModal}
          />
        </div>
      </div>
    </form>
  );
}
