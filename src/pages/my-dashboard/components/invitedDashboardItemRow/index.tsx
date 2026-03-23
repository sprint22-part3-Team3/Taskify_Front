import { Button } from '@/shared/components/button';
import { cn } from '@/shared/utils/cn';
import type { InvitedDashboardItemRowProps } from './invitedDashboardItemRow.types';

/**
 * 초대받은 대시보드 목록의 단일 행을 렌더링합니다.
 * 모바일/데스크톱 레이아웃은 내부 반응형으로 처리합니다.
 *
 * @example
 * ```tsx
 * <InvitedDashboardItemRow invitedDashboardItem={invitedDashboardItem} />
 * ```
 */
function InvitedDashboardItemRow({
  invitedDashboardItem,
  className,
  ...props
}: InvitedDashboardItemRowProps) {
  return (
    <div
      className={cn('border-b border-gray-100 py-4 md:px-6 md:py-4', className)}
      {...props}
    >
      <div className="md:hidden">
        <div className="flex items-center gap-4">
          <span className="typo-md-medium w-10 shrink-0 text-gray-300">
            이름
          </span>
          <span className="typo-md-regular text-black-200">
            {invitedDashboardItem.name}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <span className="typo-md-medium w-10 shrink-0 text-gray-300">
            초대자
          </span>
          <span className="typo-md-regular text-black-200">
            {invitedDashboardItem.inviter}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Button theme="primary" size="sm" className="h-8 flex-1 px-0">
            수락
          </Button>
          <Button
            theme="outlined"
            size="sm"
            className="text-primary-500 h-8 flex-1 px-0"
          >
            거절
          </Button>
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-3 md:items-center">
        <span className="md:typo-lg-regular typo-md-regular text-black-200">
          {invitedDashboardItem.name}
        </span>
        <span className="md:typo-lg-regular typo-md-regular text-black-200">
          {invitedDashboardItem.inviter}
        </span>
        <div className="flex items-center gap-2">
          <Button theme="primary" size="sm" className="min-w-21 px-0">
            수락
          </Button>
          <Button
            theme="outlined"
            size="sm"
            className="text-primary-500 min-w-21 px-0"
          >
            거절
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InvitedDashboardItemRow;
