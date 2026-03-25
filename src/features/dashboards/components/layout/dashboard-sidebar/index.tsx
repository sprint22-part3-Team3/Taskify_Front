import type { SidebarProps } from '@/features/dashboards/components/layout/dashboard-sidebar/dashboardSidebar.types';
import Logo from '@/shared/components/logo';
import { ColorLabel } from '@/features/dashboards/components/color/color-label';
import { IcAddBox, IcBookmark } from '@/shared/assets';
import { cn } from '@/shared/utils/cn';
import NavigationButtons from '@/shared/components/navigation-buttons';

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
// TODO: API 연동 후 제거
const SAMPLE_DASHBOARDS = [
  { id: 1, title: '비브리지', color: '#22c55e', isOwner: true },
  { id: 2, title: '코드잇', color: '#a855f7', isOwner: true },
  { id: 3, title: '3분기 계획', color: '#f97316', isOwner: false },
  { id: 4, title: '회의록', color: '#3b82f6', isOwner: false },
  { id: 5, title: '중요 문서함', color: '#ec4899', isOwner: false },
];

export default function Sidebar({
  dashboards = SAMPLE_DASHBOARDS, //TODO: API 연결할 때 SAMPLE_DASHBOARDS 제거
  selectedId,
  onAddClick,
  onDashboardClick,
}: SidebarProps) {
  return (
    <aside className="flex h-screen w-17 shrink-0 flex-col bg-white md:w-40 lg:w-75">
      {/* 로고 */}
      <h1 className="flex justify-center px-5 pt-5 pb-3 md:justify-start md:p-5 md:pb-9">
        <Logo size="small" className="md:hidden" />
        <Logo size="medium" className="hidden md:block" />
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
        {dashboards.map((item) => (
          <button
            key={item.id}
            onClick={() => onDashboardClick?.(item.id)}
            className={cn(
              'hover:bg-primary-500/8 flex w-full cursor-pointer items-center justify-center gap-1.5 py-5 text-left md:justify-start md:px-5 md:py-3',
              selectedId === item.id && 'bg-primary-500/8'
            )}
          >
            {/* colorLabel 적용 */}
            <ColorLabel
              color={item.color}
              label={item.title}
              className="min-w-0"
              labelClassName="hidden truncate md:block md:typo-lg-medium lg:typo-2lg-medium"
            />
            {/* 북마크 아이콘 - 모바일에서 숨김 */}
            {item.isOwner && (
              <IcBookmark className="hidden h-4 w-4 shrink-0 md:block" />
            )}
          </button>
        ))}
      </nav>

      {/* 하단 페이지네이션 */}
      <div className="px-3 py-3">
        <NavigationButtons
          onPrev={() => console.log('이전')}
          onNext={() => console.log('다음')}
          isHidingOnMobile={true}
        />
      </div>
    </aside>
  );
}
