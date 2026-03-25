import { ColorChipset } from '@/features/dashboards/components/color/color-chipset';
import BackButton from '@/shared/components/back-button';
import { Button } from '@/shared/components/button';
import InputField from '@/shared/components/input/input-field';
import Label from '@/shared/components/input/label';
import { PageIndicator } from '@/shared/components/page-indicator';
import NavigationButtons from '@/shared/components/page-indicator/navigation-buttons';
import Title from '@/shared/components/title';
import UserProfile from '@/shared/components/user-profile';
import { DASHBOARD_COLORS } from '@/shared/constants/color.constants';
import { useState } from 'react';

export default function DashboardEditPage() {
  const [selectedColor, setSelectedColor] = useState<
    'purple' | 'blue' | 'yellow' | 'orange' | 'pink'
  >('purple');

  return (
    <div className="flex max-w-155 flex-col gap-4 p-5">
      {/* 돌아가기 */}
      <BackButton />

      {/* 대시보드 이름 변경 */}
      <section className="rounded-xl bg-white px-4 py-5 md:px-6 lg:px-7">
        <div className="mb-6 flex items-center justify-between">
          <Title size="xl" className="md:text-2xl">
            비브리지
          </Title>
        </div>

        <Label className="mb-2 block">대시보드 이름</Label>
        <InputField type="text" placeholder="뉴프로젝트" className="mb-4" />

        <ColorChipset
          colors={DASHBOARD_COLORS}
          selectedColor={selectedColor}
          onChange={setSelectedColor}
          className="mb-8"
        />

        <Button className="w-full">변경</Button>
      </section>

      {/* 구성원 */}
      <section className="rounded-xl bg-white px-4 pt-5 pb-2 md:px-6 lg:px-7">
        <div className="mb-6 flex items-center justify-between">
          <Title size="xl" className="md:text-2xl">
            구성원
          </Title>
          <div className="flex items-center gap-3">
            <PageIndicator currentPage={1} totalPages={1} />
            <NavigationButtons
              onPrev={() => {}}
              onNext={() => {}}
              isPrevDisabled={true}
              isNextDisabled={true}
            />
          </div>
        </div>

        <span className="mb-2 block text-sm text-gray-400">이름</span>

        <ul>
          {[
            { id: 1, nickname: '최승철', profileImageUrl: '' },
            { id: 2, nickname: '윤정한', profileImageUrl: '' },
            { id: 3, nickname: '홍지수', profileImageUrl: '' },
            { id: 4, nickname: '문준휘', profileImageUrl: '' },
          ].map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0"
            >
              <UserProfile user={member} />
              <Button theme="danger" size="sm" className="px-3.5 md:px-7">
                삭제
              </Button>
            </li>
          ))}
        </ul>
      </section>

      {/* 초대 내역 */}
      <section className="rounded-xl bg-white px-4 pt-5 md:px-6 lg:px-7">
        {/* 상단: 제목 + 페이지네이션 */}
        <div className="mb-6 flex items-center justify-between">
          <Title size="xl" className="md:text-2xl">
            초대 내역
          </Title>
          <div className="flex items-center gap-3">
            <PageIndicator currentPage={1} totalPages={1} />
            <NavigationButtons
              onPrev={() => {}}
              onNext={() => {}}
              isPrevDisabled={true}
              isNextDisabled={true}
            />
            {/* PC/태블릿에서만 보이는 초대하기 */}
            <Button size="sm" className="hidden md:inline-flex">
              초대하기
            </Button>
          </div>
        </div>

        {/* 이메일 라벨 + 모바일에서만 보이는 초대하기 */}
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm text-gray-400">이메일</span>
          <Button size="sm" className="md:hidden">
            초대하기
          </Button>
        </div>

        <ul>
          {[
            'codeitA@codeit.com',
            'codeitB@codeit.com',
            'codeitC@codeit.com',
            'codeitD@codeit.com',
            'codeitE@codeit.com',
          ].map((email) => (
            <li
              key={email}
              className="flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0"
            >
              <span className="text-black-200 text-sm">{email}</span>
              <Button theme="secondary" size="sm" className="px-3.5 md:px-7">
                취소
              </Button>
            </li>
          ))}
        </ul>
      </section>

      {/* 대시보드 삭제하기 */}
      <button className="typo-lg-medium md:typo-2lg-medium text-black-200 w-full rounded-lg border border-gray-200 bg-transparent py-4 hover:bg-gray-50 md:w-[320px]">
        대시보드 삭제하기
      </button>
    </div>
  );
}
