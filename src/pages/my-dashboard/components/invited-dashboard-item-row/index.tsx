import { Button } from '@/shared/components/button';
import { cn } from '@/shared/utils/cn';
import type { InvitedDashboardItemRowProps } from '@/pages/my-dashboard/components/invited-dashboard-item-row/invitedDashboardItemRow.types';

/**
 * 초대받은 대시보드 목록의 단일 행을 렌더링합니다.
 * 모바일 레이아웃은 내부 반응형으로 처리합니다.
 *
 * @example
 * ```tsx
 * <InvitedDashboardItemRow
 *   invitedDashboardItem={invitedDashboardItem}
 *   onAccept={handleInvitationAccept}
 *   onReject={handleRejectInvite}
 * />
 * ```
 */
function InvitedDashboardItemRow({
  invitedDashboardItem,
  onAccept,
  onReject,
  isResponding = false,
  className,
  ...props
}: InvitedDashboardItemRowProps) {
  return (
    <div
      className={cn('border-b border-gray-100 py-4 sm:py-5.5', className)}
      {...props}
    >
      <div className="flex items-center gap-4">
        <span className="typo-md-medium w-10 shrink-0 text-gray-300">이름</span>
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
        <Button
          theme="primary"
          size="sm"
          className="h-8 flex-1"
          disabled={isResponding}
          onClick={() => onAccept(invitedDashboardItem.id)}
        >
          수락
        </Button>
        <Button
          theme="outlined"
          size="sm"
          className="text-primary-500 h-8 flex-1"
          disabled={isResponding}
          onClick={() => onReject(invitedDashboardItem)}
        >
          거절
        </Button>
      </div>
    </div>
  );
}

export default InvitedDashboardItemRow;
