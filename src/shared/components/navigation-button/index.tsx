import type { NavigationButtonsProps } from '@/shared/components/navigation-button/navButton.types';
import { IcArrowLeft, IcArrowRight } from '@/shared/assets/icons';

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
 * function Page() {
 *   const [page, setPage] = useState(0);
 *   const totalPage = 5;
 *
 *   const handlePrev = () => {
 *     setPage((prev) => Math.max(prev - 1, 0));
 *   };
 *
 *   const handleNext = () => {
 *     setPage((prev) => Math.min(prev + 1, totalPage - 1));
 *   };
 *
 *   return (
 *     <NavigationButtons
 *       onPrev={handlePrev}
 *       onNext={handleNext}
 *       hasPrevDisabled={page === 0}
 *       hasNextDisabled={page === totalPage - 1}
 *       isHidingOnMobile
 *     />
 *   );
 * }
 * ```
 */

export default function NavigationButtons({
  onPrev,
  onNext,
  hasPrevDisabled = true,
  hasNextDisabled = true,
  isHidingOnMobile = false,
}: NavigationButtonsProps) {
  return (
    <div className={`${isHidingOnMobile ? 'hidden sm:flex' : 'flex'}`}>
      {/* 이전 버튼 */}
      <button
        onClick={onPrev}
        disabled={hasPrevDisabled}
        className={`flex h-9 w-9 items-center justify-center rounded-l border border-gray-200 md:h-10 md:w-10 ${
          hasPrevDisabled ? 'pointer-events-none' : 'hover:bg-gray-50'
        }`}
      >
        <IcArrowLeft
          className={`${hasPrevDisabled ? 'text-gray-200' : 'text-gray-400'}`}
        />
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={onNext}
        disabled={hasNextDisabled}
        className={`-ml-px flex h-9 w-9 items-center justify-center rounded-r border border-gray-200 md:h-10 md:w-10 ${
          hasNextDisabled ? 'pointer-events-none' : 'hover:bg-gray-50'
        }`}
      >
        <IcArrowRight
          className={`${hasNextDisabled ? 'text-gray-200' : 'text-gray-400'}`}
        />
      </button>
    </div>
  );
}
