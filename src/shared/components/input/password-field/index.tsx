import { useState } from 'react';
import InputField from '@/shared/components/input/input-field';
import PasswordToggleButton from '@/shared/components/input/password-toggle-button';
import { cn } from '@/shared/utils/cn';
import type { PasswordFieldProps } from './passwordField.types';

/**
 * 비밀번호 입력과 표시/숨김 토글을 함께 제공하는 공용 PasswordField 컴포넌트입니다.
 *
 * 내부적으로 비밀번호 표시 상태를 관리하며, 아이콘 버튼으로 보기/숨기기를 전환합니다.
 *
 * @example
 * ```tsx
 * <PasswordField
 *   value={password}
 *   onChange={(event) => setPassword(event.target.value)}
 *   placeholder="비밀번호를 입력해주세요"
 * />
 * ```
 */
function PasswordField({ className, ...props }: PasswordFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <InputField
        type={isPasswordVisible ? 'text' : 'password'}
        className={cn('pr-14', className)}
        {...props}
      />
      <PasswordToggleButton
        isPasswordVisible={isPasswordVisible}
        onClick={handleTogglePasswordVisibility}
      />
    </div>
  );
}

export default PasswordField;
