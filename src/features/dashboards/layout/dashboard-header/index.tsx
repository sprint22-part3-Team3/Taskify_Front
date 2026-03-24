import type { HeaderProps } from '@/features/dashboards/layout/dashboard-header/dashboardHeader.types';
import { IcAddBox, IcBookmark, IcSettings } from '@/shared/assets';
import Avatar from '@/shared/components/avatar';
import AvatarGroup from '@/shared/components/avatar/avatar-group';
import { Button } from '@/shared/components/button';
import UserProfile from '@/shared/components/user-profile';

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
// TODO: API 연동 후 제거
const SAMPLE_MEMBERS = [
  { id: 1, nickname: '유철', profileImageUrl: '' },
  { id: 2, nickname: '채연', profileImageUrl: '' },
];

export default function Header({
  title = '비브리지', // 임시 기본값
  isOwner = true,
  members = SAMPLE_MEMBERS,
  totalMemberCount = 6,
  userName = '배유철',
  profileImage,
  onManageClick,
  onInviteClick,
}: HeaderProps) {
  return (
    <header className="flex h-17.5 items-center justify-between border-b border-gray-200 bg-white px-3 md:px-10 lg:justify-between">
      {/* 제목 - 데스크탑에서만 표시 */}
      <div className="hidden items-center gap-2 lg:flex">
        <span className="typo-xl-bold text-black-200">{title}</span>
        {isOwner && <IcBookmark className="h-4 w-4" />}
      </div>

      <div className="ml-auto flex items-center gap-4 md:gap-8">
        {/* 관리 / 초대하기 버튼 */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            theme="icon"
            className="gap-2 md:h-10 md:px-5 md:text-sm"
            onClick={onManageClick}
          >
            <IcSettings className="hidden md:block" />
            관리
          </Button>
          <Button
            theme="icon"
            className="gap-2 md:h-10 md:px-5 md:text-sm"
            onClick={onInviteClick}
          >
            <IcAddBox className="hidden md:block" />
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
        <div className="border-l border-gray-200 pl-4 md:pl-8">
          <UserProfile
            user={{
              id: 0,
              nickname: userName,
              profileImageUrl: profileImage ?? '',
            }}
            size="lg"
            nicknameClassName="hidden md:block text-sm"
          />
        </div>
      </div>
    </header>
  );
}
