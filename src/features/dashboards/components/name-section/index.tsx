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
import {
  getDashboard,
  updateDashboard,
} from '@/features/dashboards/apis/dashboards';
import { dispatchDashboardTitleChangeEvent } from '@/features/dashboards/utils/dashboardEvents';

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
  const [submitError, setSubmitError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [originalColor, setOriginalColor] =
    useState<DashboardColorName>('purple');

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
          const colorName = hexToColorName(data.color);
          setOriginalColor(colorName);
          dispatchDashboardTitleChangeEvent({ title: data.title });
        }
      } catch {
        setLoadError('대시보드 정보를 불러오지 못했습니다.');
      }
    }

    fetchDashboard(dashboardId);
  }, [dashboardId]);

  const hasChanges =
    title.trim() !== dashboardTitle || selectedColor !== originalColor;

  // 변경 버튼 클릭 시 PUT API 호출
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dashboardId) return;
    if (!title.trim()) {
      setErrorMessage('대시보드 이름을 입력해주세요.');
      return;
    }
    setErrorMessage('');
    setSubmitError('');
    setIsSubmitting(true);
    try {
      const hexColor = DASHBOARD_COLOR_HEX[selectedColor];
      const result = await updateDashboard(dashboardId, {
        title,
        color: hexColor,
      });

      if (result) {
        setDashboardTitle(result.title);
        setTitle(result.title);
        setOriginalColor(selectedColor);
        dispatchDashboardTitleChangeEvent({ title: result.title });
      }
    } catch {
      setSubmitError('오류가 발생하여 대시보드를 수정할 수 없습니다.');
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
      {loadError && (
        <p className="typo-md-regular text-error mb-4">{loadError}</p>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          label="대시보드 이름"
          type="text"
          placeholder="대시보드 이름을 입력해주세요"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errorMessage) setErrorMessage('');
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
        {submitError && (
          <p className="typo-md-regular text-error mb-4">{submitError}</p>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !hasChanges}
          isLoading={isSubmitting}
        >
          변경
        </Button>
      </form>
    </section>
  );
}
