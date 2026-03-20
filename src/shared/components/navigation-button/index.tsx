//todo: 리팩토링하기

type NavigationButtonsProps = {
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
};

export default function NavigationButtons({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-2 rounded border border-red-500 p-2">
      {/* 이전 버튼 */}
      <button
        onClick={onPrev}
        disabled={prevDisabled}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
          prevDisabled
            ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-300'
            : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-100'
        } `}
      >
        ←
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
          nextDisabled
            ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-300'
            : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-100'
        } `}
      >
        →
      </button>
    </div>
  );
}
