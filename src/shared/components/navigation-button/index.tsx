import type { NavigationButtonsProps } from '@/shared/components/navigation-button/navigationButtons.types';
import NavigationButton from '@/shared/components/navigation-button/nav-button';
import { cn } from '@/shared/utils/cn';

/**
 * 이전/다음 네비게이션 버튼 컴포넌트
 *
 * @remarks
 * - 이전/다음 버튼을 통해 페이지 이동을 제어하는 UI 컴포넌트입니다.
 * - 버튼 상태에 따라 disabled 스타일이 적용됩니다.
 * - 모바일에서는 `hideOnMobile` 옵션으로 표시 여부를 제어할 수 있습니다.
 *
 * @example 기본 사용 예시
 * ```tsx
 * <NavigationButtons
 *   onPrev={() => console.log('이전')}
 *   onNext={() => console.log('다음')}
 * />
 * ```
 *
 * @example 페이지 상태와 함께 사용하는 예시
 * ```tsx
 * const [currentPage, setCurrentPage] = useState(1);
 * const totalPages = 5;
 *  * <NavigationButtons
 *   onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
 *   onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
 *   hasPrevDisabled={currentPage === 1}
 *   hasNextDisabled={currentPage === totalPages}
 * />
 * ```
 * @example 모바일에서 숨기는 예시
 * ```tsx
 * <NavigationButtons
 *   onPrev={() => console.log('이전')}
 *   onNext={() => console.log('다음')}
 *   isHidingOnMobile={true}
 * />
 * ```
 */

export default function NavigationButtons({
  onPrev,
  onNext,
  hasPrevDisabled = false,
  hasNextDisabled = false,
  isHidingOnMobile = false,
}: NavigationButtonsProps) {
  return (
    <div className={cn('flex', isHidingOnMobile && 'hidden sm:flex')}>
      {/* 이전 버튼 */}
      <NavigationButton
        direction="prev"
        disabled={hasPrevDisabled}
        onClick={onPrev}
      />

      {/* 다음 버튼 */}
      <NavigationButton
        direction="next"
        disabled={hasNextDisabled}
        onClick={onNext}
      />
    </div>
  );
}
