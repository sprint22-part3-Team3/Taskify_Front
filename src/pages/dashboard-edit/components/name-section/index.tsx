import { ColorChipset } from '@/features/dashboards/components/color/color-chipset';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import Title from '@/shared/components/title';
import { DASHBOARD_COLORS } from '@/shared/constants/color.constants';
import { useState } from 'react';

export default function NameSection() {
  const [selectedColor, setSelectedColor] =
    useState<DashboardColorName>('purple');

  return (
    <section className="rounded-xl bg-white px-4 py-5 md:px-6 lg:px-7">
      <div className="mb-6 flex items-center justify-between">
        <Title size="xl" className="md:text-2xl">
          비브리지
        </Title>
      </div>

      <Input
        label="대시보드 이름"
        type="text"
        placeholder="대시보드 이름을 입력해주세요"
        containerClassName="mb-4"
      />

      <ColorChipset
        colors={DASHBOARD_COLORS}
        selectedColor={selectedColor}
        onChange={setSelectedColor}
        className="mb-8"
      />

      <Button className="w-full">변경</Button>
    </section>
  );
}
