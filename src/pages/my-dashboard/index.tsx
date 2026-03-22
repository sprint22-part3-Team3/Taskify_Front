import { IcAdd, IcMailOff } from '@/shared/assets/icons';
import { Button } from '@/shared/components/button';

/**
 * 내 대시보드 페이지의 본문 영역을 렌더링합니다.
 *
 * @example
 * ```tsx
 * <MyDashboardPage />
 * ```
 */
function MyDashboardPage() {
  return (
    <main className="min-h-dvh bg-gray-50">
      <div className="mx-auto w-full px-10 pt-10">
        <section>
          <Button
            theme="outlined"
            size="icon"
            className="typo-md-semibold md:typo-lg-semibold h-14.5 w-full max-w-65 justify-between px-5 text-left sm:max-w-62.5 md:h-17 md:max-w-83"
          >
            <span>새로운 대시보드</span>
            <IcAdd className="text-primary-500 h-5 w-5" />
          </Button>
        </section>

        <section className="mt-12 h-81.75 max-w-240 rounded-lg bg-white px-10 pt-6 md:h-97.5">
          <h2 className="typo-md-bold text-black-200 md:typo-xl-bold">
            초대받은 대시보드
          </h2>

          <div className="flex flex-col items-center justify-center gap-6 pt-16">
            <IcMailOff className="h-15 w-15 text-gray-200 md:h-18 md:w-18" />
            <p className="typo-xs-regular md:typo-lg-regular pb-30 text-gray-300">
              아직 초대받은 대시보드가 없어요
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MyDashboardPage;
