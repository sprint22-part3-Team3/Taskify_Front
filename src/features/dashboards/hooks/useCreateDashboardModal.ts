import { useState } from 'react';
import type { CreateDashboardModalProps } from '@/features/dashboards/components/create-dashboard-modal/createDashboardModal.types';
import { DASHBOARD_ERROR_MESSAGE } from '@/features/dashboards/constants/dashboardErrorMessage.constants';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import { getDashboardColors } from '@/features/dashboards/utils/dashboardColor';
import { getApiErrorMessage } from '@/features/dashboards/utils/getApiErrorMessage';

const dashboardColors = getDashboardColors();
const initialDashboardColor = dashboardColors[0]?.id ?? 'purple';

/**
 * 새로운 대시보드 생성 모달의 입력 상태와 제출 로직을 관리합니다.
 *
 * @example
 * ```tsx
 * const {
 *   dashboardColors,
 *   dashboardTitle,
 *   dashboardColor,
 *   dashboardErrorMessage,
 *   isCreateDisabled,
 *   handleDashboardTitleChange,
 *   handleDashboardColorChange,
 *   handleClose,
 *   handleSubmit,
 * } = useCreateDashboardModal({
 *   isOpen,
 *   isCreating,
 *   onClose,
 *   onCreate,
 * });
 * ```
 */
export function useCreateDashboardModal({
  isCreating,
  onClose,
  onCreate,
}: CreateDashboardModalProps) {
  const [dashboardTitle, setDashboardTitle] = useState('');
  const [dashboardColor, setDashboardColor] = useState<DashboardColorName>(
    initialDashboardColor
  );
  const [dashboardErrorMessage, setDashboardErrorMessage] = useState('');

  const isCreateDisabled = dashboardTitle.trim().length === 0 || isCreating;

  const resetCreateDashboardModal = () => {
    setDashboardTitle('');
    setDashboardColor(initialDashboardColor);
    setDashboardErrorMessage('');
  };

  const handleClose = () => {
    resetCreateDashboardModal();
    onClose();
  };

  const handleDashboardTitleChange = (dashboardTitleValue: string) => {
    setDashboardTitle(dashboardTitleValue);

    if (dashboardErrorMessage) {
      setDashboardErrorMessage('');
    }
  };

  const handleDashboardColorChange = (
    dashboardColorValue: DashboardColorName
  ) => {
    setDashboardColor(dashboardColorValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (dashboardTitle.trim().length === 0) {
      setDashboardErrorMessage(DASHBOARD_ERROR_MESSAGE.emptyDashboardTitle);
      return;
    }

    try {
      await onCreate(dashboardTitle.trim(), dashboardColor);
      handleClose();
    } catch (error) {
      setDashboardErrorMessage(
        getApiErrorMessage(error, DASHBOARD_ERROR_MESSAGE.createDashboard)
      );
    }
  };
  return {
    dashboardColors,
    dashboardTitle,
    dashboardColor,
    dashboardErrorMessage,
    isCreateDisabled,
    handleDashboardTitleChange,
    handleDashboardColorChange,
    handleClose,
    handleSubmit,
  };
}
