import { ColorChipset } from '@/features/dashboards/components/color/color-chipset';
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
    <div className="bg-gray-50">
      <div className="flex max-w-155 flex-col gap-4 p-5">
        {/* 돌아가기 */}
        <button className="flex items-center gap-1 text-sm text-gray-400">
          ‹ 돌아가기
        </button>

        {/* 대시보드 이름 변경 */}
        <section className="rounded-lg bg-white px-7 py-8">
          <div className="mb-6 flex items-center justify-between">
            <Title size="2xl">비브리지</Title>
          </div>

          <Label className="mb-2 block">대시보드 이름</Label>
          <InputField type="text" placeholder="뉴프로젝트" className="mb-4" />

          <ColorChipset
            colors={DASHBOARD_COLORS}
            selectedColor={selectedColor}
            onChange={setSelectedColor}
            className="mb-6"
          />

          <Button className="w-full">변경</Button>
        </section>

        {/* 구성원 */}
        <section className="rounded-lg bg-white px-7 py-8">
          <div className="mb-6 flex items-center justify-between">
            <Title size="2xl">구성원</Title>
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

          <span className="mb-1 block text-sm text-gray-400">이름</span>

          <ul>
            {[
              { id: 1, nickname: '최승철', profileImageUrl: '' },
              { id: 2, nickname: '윤정한', profileImageUrl: '' },
              { id: 3, nickname: '홍지수', profileImageUrl: '' },
              { id: 4, nickname: '문준휘', profileImageUrl: '' },
            ].map((member) => (
              <li
                key={member.id}
                className="flex items-center justify-between border-b border-gray-100 py-4"
              >
                <UserProfile user={member} />
                <Button theme="danger" size="sm">
                  삭제
                </Button>
              </li>
            ))}
          </ul>
        </section>

        {/* 초대 내역 */}
        <section className="rounded-lg bg-white px-7 py-8">
          <div className="mb-6 flex items-center justify-between">
            <Title size="2xl">초대 내역</Title>
            <div className="flex items-center gap-3">
              <PageIndicator currentPage={1} totalPages={1} />
              <NavigationButtons
                onPrev={() => {}}
                onNext={() => {}}
                isPrevDisabled={true}
                isNextDisabled={true}
              />
              <Button size="sm">초대하기</Button>
            </div>
          </div>

          <span className="mb-1 block text-sm text-gray-400">이메일</span>

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
                className="flex items-center justify-between border-b border-gray-100 py-4"
              >
                <span className="text-black-200 text-sm">{email}</span>
                <Button theme="secondary" size="sm">
                  취소
                </Button>
              </li>
            ))}
          </ul>
        </section>

        {/* 대시보드 삭제하기 */}
        <button className="w-[320px] rounded-md border border-gray-200 bg-white py-4 text-lg text-gray-400 hover:bg-gray-50">
          대시보드 삭제하기
        </button>
      </div>
    </div>
  );
}
