import type { HeaderProps } from '@/features/dashboards/layout/dashboards-header/dashboards-header.types';
import { IcAddBox, IcBookmark, IcSettings } from '@/shared/assets';
import Avatar from '@/shared/components/avatar';
import AvatarGroup from '@/shared/components/avatar/avatar-group';
import { Button } from '@/shared/components/button';

/**
 * 페이지 상단에 표시되는 공통 헤더 컴포넌트입니다.
 *
 * 대시보드 제목, 관리/초대 버튼, 멤버 아바타 그룹, 로그인 유저 프로필을 포함합니다.
 * 반응형으로 동작하며, 모바일에서는 아이콘과 유저 이름이 숨겨지고,
 * 데스크탑에서만 대시보드 제목이 표시됩니다.
 *
 * @example
 * ```tsx
 * <Header
 *   title="비브리지"
 *   isOwner={true}
 *   members={[{ id: 1, nickname: '유철', profileImageUrl: '' }]}
 *   totalMemberCount={6}
 *   userName="배유철"
 *   onManageClick={() => console.log('관리')}
 *   onInviteClick={() => console.log('초대')}
 * />
 * ```
 */
export default function Header({
  title,
  isOwner = false,
  members = [],
  totalMemberCount = 0,
  userName,
  profileImage,
  onManageClick,
  onInviteClick,
}: HeaderProps) {
  return (
    <header className="flex h-[70px] items-center justify-between border-b border-gray-200 bg-white px-3 md:px-6">
      {/* 제목 - 데스크탑에서만 표시 */}
      <div className="hidden items-center gap-2 lg:flex">
        <span className="text-lg font-bold text-gray-800">{title}</span>
        {isOwner && <IcBookmark className="h-4 w-4" />}
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-4">
        {/* 관리 / 초대하기 버튼 */}
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            theme="outlined"
            size="icon"
            className="h-8 px-2 text-xs text-gray-400 md:h-10 md:px-4 md:text-sm"
            onClick={onManageClick}
          >
            <IcSettings className="hidden h-5 w-5 md:block" />
            관리
          </Button>
          <Button
            theme="outlined"
            size="icon"
            className="h-8 px-2 text-xs text-gray-400 md:h-10 md:px-4 md:text-sm"
            onClick={onInviteClick}
          >
            <IcAddBox className="hidden h-5 w-5 md:block" />
            초대하기
          </Button>
        </div>

        {/* 멤버 프로필 */}
        <AvatarGroup
          users={members.map((member) => ({
            id: member.id,
            avatar: (
              <Avatar user={member} size="md">
                {member.profileImageUrl ? <Avatar.Img /> : <Avatar.Fallback />}
              </Avatar>
            ),
          }))}
          totalCount={totalMemberCount}
        />

        {/* 유저 프로필 - 이름은 모바일에서 숨김 */}
        <div className="flex items-center gap-3 border-l border-gray-200 pl-2 md:pl-4">
          <Avatar
            user={{
              id: 0,
              nickname: userName,
              profileImageUrl: profileImage ?? '',
            }}
            size="md"
          >
            {profileImage ? <Avatar.Img /> : <Avatar.Fallback />}
          </Avatar>
          <span className="hidden text-sm font-medium text-gray-700 md:block">
            {userName}
          </span>
        </div>
      </div>
    </header>
  );
}
