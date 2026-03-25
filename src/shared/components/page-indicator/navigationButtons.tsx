import type { NavigationButtonsProps } from '@/shared/components/page-indicator/navigationButtons.types';
import NavigationButton from '@/shared/components/page-indicator/navButton';
import { cn } from '@/shared/utils/cn';

export default function NavigationButtons({
  onPrev,
  onNext,
  isPrevDisabled = false,
  isNextDisabled = false,
  isHidingOnMobile = false,
}: NavigationButtonsProps) {
  return (
    <div className={cn('flex', isHidingOnMobile && 'hidden sm:flex')}>
      <NavigationButton
        direction="prev"
        disabled={isPrevDisabled}
        onClick={onPrev}
      />
      <NavigationButton
        direction="next"
        disabled={isNextDisabled}
        onClick={onNext}
      />
    </div>
  );
}
