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
    >
      {isPasswordVisible ? (
        <IcEyeOn className="h-6 w-6" />
      ) : (
        <IcEyeOff className="h-6 w-6" />
      )}
    </button>
  );
}

export default PasswordToggleButton;
