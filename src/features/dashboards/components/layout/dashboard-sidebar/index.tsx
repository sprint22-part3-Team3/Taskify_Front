import type { SidebarProps } from '@/features/dashboards/components/layout/dashboard-sidebar/dashboardSidebar.types';
import Logo from '@/shared/components/logo';
import { ColorLabel } from '@/features/dashboards/components/color/color-label';
import { getDashboardColorHex } from '@/features/dashboards/utils/dashboardColor';
import { IcAddBox, IcBookmark } from '@/shared/assets';
import { cn } from '@/shared/utils/cn';
import NavigationButtons from '@/shared/components/page-indicator/navigation-buttons';

/**
 * 대시보드 목록을 보여주는 사이드바 컴포넌트입니다.
 *
 * 반응형으로 동작하며, 모바일에서는 색상 점만,
 * 태블릿에서는 텍스트 포함, 데스크탑에서는 전체 표시됩니다.
 * 선택된 대시보드는 배경색이 변경되며, 소유자 항목에는 북마크 아이콘이 표시됩니다.
 *
 * @example
 * ```tsx
 * <Sidebar
 *   dashboards={[
 *     { id: 1, title: '비브리지', color: '#22c55e', isOwner: true },
 *   ]}
 *   selectedId={1}
 *   onAddClick={() => console.log('추가')}
 *   onDashboardClick={(id) => console.log(id)}
 * />
 * ```
 */
const handlePrevPage = () => undefined;
const handleNextPage = () => undefined;

export default function Sidebar({
  dashboards,
  selectedId,
  isLoading = false,
  errorMessage,
  onAddClick,
  onDashboardClick,
}: SidebarProps) {
  return (
    <aside className="flex h-screen w-17 shrink-0 flex-col bg-white md:w-40 lg:w-75">
      {/* 로고 */}
      <h1 className="flex justify-center px-5 pt-5 pb-3 md:justify-start md:p-5 md:pb-9">
        <Logo size="small" to="/mydashboard" className="md:hidden" />
        <Logo size="medium" to="/mydashboard" className="hidden md:block" />
      </h1>

      {/* Dash Boards 헤더 - 모바일에서 숨김 */}
      <div className="mb-4 hidden items-center justify-between px-6 md:flex">
        <span className="typo-xs-medium text-gray-400">Dash Boards</span>
        <button onClick={onAddClick} className="cursor-pointer">
          <IcAddBox />
        </button>
      </div>

      {/* 모바일용 + 버튼 */}
      <div className="flex justify-center py-3 md:hidden">
        <button onClick={onAddClick} className="cursor-pointer">
          <IcAddBox />
        </button>
      </div>

      {/* 대시보드 목록 */}
      <nav className="flex-1 overflow-y-auto px-2 md:px-1 lg:py-1">
        {dashboards.map((sidebarDashboardItem) => (
          <button
            key={sidebarDashboardItem.id}
            onClick={() => onDashboardClick?.(sidebarDashboardItem.id)}
            className={cn(
              'hover:bg-primary-500/8 flex w-full cursor-pointer items-center justify-center py-5 text-left md:justify-start md:px-5 md:py-3',
              selectedId === sidebarDashboardItem.id && 'bg-primary-500/8'
            )}
          >
            <div className="flex min-w-0 items-center gap-0 md:gap-2 lg:gap-2.5">
              <ColorLabel
                color={getDashboardColorHex(sidebarDashboardItem.color)}
                label={sidebarDashboardItem.title}
                className="min-w-0"
                labelClassName="hidden truncate md:block md:typo-lg-medium lg:typo-2lg-medium"
              />
              {sidebarDashboardItem.createdByMe && (
                <IcBookmark className="hidden h-4 w-4 shrink-0 md:block" />
              )}
            </div>
          </button>
        ))}

        {isLoading && dashboards.length === 0 && (
          <p className="typo-md-regular px-3 py-2 text-gray-400 md:px-5">
            대시보드를 불러오는 중이에요.
          </p>
        )}

        {errorMessage && dashboards.length === 0 && (
          <p className="typo-md-regular text-error px-3 py-2 md:px-5">
            {errorMessage}
          </p>
        )}
      </nav>

      {/* 하단 페이지네이션 */}
      <div className="px-3 py-3">
        <NavigationButtons
          onPrev={handlePrevPage}
          onNext={handleNextPage}
          isPrevDisabled={true}
          isNextDisabled={true}
          isHidingOnMobile={true}
        />
      </div>
    </aside>
  );
}
