import { IcEyeOff, IcEyeOn } from '@/shared/assets/icons';
import type { PasswordToggleButtonProps } from './passwordToggleButton.types';

function PasswordToggleButton({
  isPasswordVisible,
  onClick,
}: PasswordToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-300"
      aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
    >
      {isPasswordVisible ? (
        <IcEyeOn className="h-6 w-6 cursor-pointer" />
      ) : (
        <IcEyeOff className="h-6 w-6 cursor-pointer" />
      )}
    </button>
  );
}

export default PasswordToggleButton;
