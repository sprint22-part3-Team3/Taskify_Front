import { Button } from '@/shared/components/button';
import { Modal } from '@/shared/components/modal';
import type { DeleteModalProps } from '@/shared/components/delete-modal/deleteModal.types';

/**
 * 삭제 확인 UI를 공통으로 렌더링하는 컴포넌트입니다.
 *
 * 전체 모달로 사용할 수도 있고, 이미 열린 모달 내부 콘텐츠로만 사용할 수도 있습니다.
 *
 * @example
 * ```tsx
 * <DeleteModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   onConfirm={handleDelete}
 *   message={
 *     <>
 *       구성원을 <span className="text-error">삭제</span> 하시겠습니까?
 *     </>
 *   }
 * />
 * ```
 */
function DeleteModal({
  message,
  onClose,
  onConfirm,
  isOpen,
  className,
  renderInModal = true,
  cancelText = '취소',
  confirmText = '삭제',
}: DeleteModalProps) {
  const content = (
    <>
      <p className="typo-xl-medium text-black-200 pb-10 text-center">
        {message}
      </p>

      <div className="flex gap-2 *:flex-1 *:px-0">
        <Button theme="cancel" type="button" onClick={onClose}>
          {cancelText}
        </Button>
        <Button theme="primary" type="button" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </>
  );

  if (!renderInModal) {
    return content;
  }

  return (
    <Modal isOpen={Boolean(isOpen)} onClose={onClose} className={className}>
      {content}
    </Modal>
  );
}

export default DeleteModal;
