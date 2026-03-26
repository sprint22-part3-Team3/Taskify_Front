import { IcCheckbox } from '@/shared/assets/icons';
import type { SignupAgreementProps } from '@/pages/signup/components/signup-agreement/signupAgreement.types';
import { cn } from '@/shared/utils/cn';

/**
 * 회원가입 페이지에서 이용약관 동의 여부를 체크하는 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <SignupAgreement
 *   isChecked={isAgreementChecked}
 *   onChange={setIsAgreementChecked}
 * />
 * ```
 */
function SignupAgreement({ isChecked, onChange }: SignupAgreementProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded-sm border border-gray-300 bg-white transition-colors',
          isChecked && 'border-primary-500 bg-primary-500/8'
        )}
      >
        {isChecked && <IcCheckbox className="h-2 w-2.5" />}
      </span>
      <span className="typo-lg-regular text-black">이용약관에 동의합니다.</span>
    </label>
  );
}

export default SignupAgreement;
