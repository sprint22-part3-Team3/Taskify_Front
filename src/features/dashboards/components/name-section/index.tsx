import { ColorChipset } from '@/features/dashboards/components/color/color-chipset';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import Title from '@/shared/components/title';
import {
  DASHBOARD_COLORS,
  DASHBOARD_COLOR_HEX,
} from '@/features/dashboards/constants/dashboardColorMap.constants';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDashboard } from '@/features/dashboards/apis/getDashboard';
import { updateDashboard } from '@/features/dashboards/apis/updateDashboard';

/**
 * hex 코드를 DashboardColorName으로 변환하는 함수
 * API 응답의 hex 색상을 컴포넌트에서 쓰는 이름으로 바꿔줌
 */
function hexToColorName(hex: string): DashboardColorName {
  const entry = Object.entries(DASHBOARD_COLOR_HEX).find(
    ([, value]) => value === hex
  );

  return (entry?.[0] as DashboardColorName) ?? 'purple';
}

/**
 * 대시보드 이름과 색상을 수정하는 섹션 컴포넌트입니다.
 *
 * 페이지 진입 시 현재 대시보드 정보를 불러와 input에 표시하고,
 * 사용자가 수정 후 '변경' 버튼을 클릭하면 PUT API로 수정 요청을 보냅니다.
 */
export default function NameSection() {
  const { id: dashboardId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 대시보드 제목 (input에 표시할 값)
  const [title, setTitle] = useState('');
  // 현재 선택된 색상
  const [selectedColor, setSelectedColor] =
    useState<DashboardColorName>('purple');
  // 제목 표시용 (이름변경 섹션 상단에 보여줄 현재 대시보드 이름)
  const [dashboardTitle, setDashboardTitle] = useState('');

  // 페이지 진입 시 현재 대시보드 정보 불러오기
  useEffect(() => {
    if (!dashboardId) return;

    async function fetchDashboard(id: string) {
      try {
        const data = await getDashboard(id);

        if (data) {
          setTitle(data.title);
          setDashboardTitle(data.title);
          setSelectedColor(hexToColorName(data.color));
        }
      } catch (error) {
        console.error('대시보드 정보 로딩 실패:', error);
        // TODO: 사용자에게 에러를 알리는 UI 처리 (예: 토스트 메시지)
      }
    }

    fetchDashboard(dashboardId);
  }, [dashboardId]);

  // 변경 버튼 클릭 시 PUT API 호출
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dashboardId) return;
    if (!title.trim()) {
      setErrorMessage('대시보드 이름을 입력해주세요.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      const hexColor = DASHBOARD_COLOR_HEX[selectedColor];
      const result = await updateDashboard(dashboardId, {
        title,
        color: hexColor,
      });

      if (result) {
        setDashboardTitle(result.title);
        alert('대시보드가 수정되었습니다.');
      } else {
        alert('대시보드 수정에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('대시보드 업데이트 실패:', error);
      alert('오류가 발생하여 대시보드를 수정할 수 없습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-xl bg-white px-4 py-5 md:px-6 lg:px-7">
      <div className="mb-6 flex items-center justify-between">
        <Title size="xl" as="h3" className="md:text-2xl">
          {dashboardTitle}
        </Title>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          label="대시보드 이름"
          type="text"
          placeholder="대시보드 이름을 입력해주세요"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errorMessage) setErrorMessage(''); // 입력 시작하면 에러 메시지 제거
          }}
          errorMessage={errorMessage}
          containerClassName="mb-4"
        />

        <ColorChipset
          colors={DASHBOARD_COLORS}
          selectedColor={selectedColor}
          onChange={setSelectedColor}
          className="mb-8"
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          변경
        </Button>
      </form>
    </section>
  );
}
