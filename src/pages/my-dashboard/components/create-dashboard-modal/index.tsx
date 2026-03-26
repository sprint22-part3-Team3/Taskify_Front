import { useState } from 'react';
import { ColorChipset } from '@/features/dashboards/components/color/color-chipset';
import { getDashboardColors } from '@/features/dashboards/constants/dashboardColorMap.constants';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import type { CreateDashboardModalProps } from '@/pages/my-dashboard/components/create-dashboard-modal/createDashboardModal.types';

const dashboardColors = getDashboardColors();
const initialDashboardColor = dashboardColors[0]?.id ?? 'purple';

/**
 * 새로운 대시보드를 생성하는 모달입니다.
 *
 * @example
 * ```tsx
 * <CreateDashboardModal
 *   isOpen={isOpen}
 *   isCreating={false}
 *   onClose={closeModal}
 *   onCreate={handleCreateDashboard}
 * />
 * ```
 */
function CreateDashboardModal({
  isOpen,
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

  const handleClose = () => {
    setDashboardTitle('');
    setDashboardColor(initialDashboardColor);
    setDashboardErrorMessage('');
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (dashboardTitle.trim().length === 0) {
      setDashboardErrorMessage('대시보드 이름을 입력해 주세요.');
      return;
    }

    try {
      await onCreate(dashboardTitle.trim(), dashboardColor);
      handleClose();
    } catch {
      setDashboardErrorMessage('대시보드를 생성하지 못했어요.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-142">
      <Modal.Header title="새로운 대시보드" hasCloseIcon />
      <form onSubmit={handleSubmit}>
        <Modal.Main>
          <Input
            label="대시보드 이름"
            value={dashboardTitle}
            onChange={(event) => {
              setDashboardTitle(event.target.value);
              if (dashboardErrorMessage) {
                setDashboardErrorMessage('');
              }
            }}
            placeholder="대시보드 이름을 입력해 주세요"
            errorMessage={dashboardErrorMessage}
          />

          <div className="mt-6 flex flex-col gap-2">
            <span className="typo-lg-medium text-black-200">색상</span>
            <ColorChipset
              colors={dashboardColors}
              selectedColor={dashboardColor}
              onChange={setDashboardColor}
            />
          </div>
        </Modal.Main>
        <Modal.Footer>
          <Button theme="cancel" size="md" onClick={handleClose}>
            취소
          </Button>
          <Button
            theme="primary"
            size="md"
            type="submit"
            disabled={isCreateDisabled}
          >
            생성
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CreateDashboardModal;
