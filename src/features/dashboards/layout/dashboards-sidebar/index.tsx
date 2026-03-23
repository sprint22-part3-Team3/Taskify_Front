import type { SidebarProps } from '@/features/dashboards/layout/dashboards-sidebar/dashboards-sidebar.types';
import Logo from '@/shared/components/logo';
import { ColorLabel } from '@/features/dashboards/components/color/color-label';
import { IcAddBox, IcBookmark } from '@/shared/assets';

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
export default function Sidebar({
  dashboards,
  selectedId,
  onAddClick,
  onDashboardClick,
}: SidebarProps) {
  return (
    <aside className="flex h-screen w-[67px] flex-col bg-white md:w-[160px] lg:w-[300px]">
      {/* 로고 */}
      <div className="p-3 md:p-6">
        <Logo size="small" className="md:hidden" />
        <Logo size="medium" className="hidden md:block" />
      </div>

      {/* Dash Boards 헤더 - 모바일에서 숨김 */}
      <div className="hidden items-center justify-between px-6 py-3 md:flex">
        <span className="text-xs font-bold text-gray-500">Dash Boards</span>
        <button onClick={onAddClick} className="cursor-pointer">
          <IcAddBox className="h-5 w-5" />
        </button>
      </div>

      {/* 모바일용 + 버튼 */}
      <div className="flex justify-center py-3 md:hidden">
        <button onClick={onAddClick} className="cursor-pointer">
          <IcAddBox className="h-5 w-5" />
        </button>
      </div>

      {/* 대시보드 목록 */}
      <nav className="flex-1 overflow-y-auto px-2 md:px-3">
        {dashboards.map((item) => (
          <div
            key={item.id}
            onClick={() => onDashboardClick?.(item.id)}
            className={`hover:bg-primary-100 flex cursor-pointer items-center justify-center gap-3 rounded-md px-1 py-3 md:justify-start md:px-3 md:py-2 ${
              selectedId === item.id ? 'bg-primary-100' : ''
            }`}
          >
            {/* 모바일: 색상 점만 */}
            <span
              className="h-2 w-2 shrink-0 rounded-full md:hidden"
              style={{ backgroundColor: item.color }}
            />
            {/* 태블릿 이상: ColorLabel */}
            <div className="hidden min-w-0 md:block">
              <ColorLabel
                color={item.color}
                label={item.title}
                className="min-w-0"
                labelClassName="truncate"
              />
            </div>
            {/* 북마크 아이콘 - 모바일에서 숨김 */}
            {item.isOwner && (
              <IcBookmark className="hidden h-4 w-4 shrink-0 md:block" />
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
