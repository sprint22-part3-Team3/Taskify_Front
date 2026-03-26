import { Button } from '@/shared/components/button';
import type { DeleteModalProps } from '@/features/columns/components/modal/delete-modal/deleteModal.types';

/**
 * 컬럼 삭제 전 확인 내용을 렌더링하는 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <DeleteModal onClose={handleClose} onConfirm={handleDelete} />
 * ```
 */
function DeleteModal({ onClose, onConfirm }: DeleteModalProps) {
  return (
    <>
      <p className="typo-xl-medium text-black-200 md:typo-xl-medium pb-10 text-center">
        컬럼을 모두 <span className="text-error">삭제</span> 하시겠습니까?
      </p>

      <div className="flex gap-2 *:flex-1 *:px-0">
        <Button theme="cancel" type="button" onClick={onClose}>
          취소
        </Button>
        <Button theme="primary" type="button" onClick={onConfirm}>
          삭제
        </Button>
      </div>
    </>
  );
}

export default DeleteModal;
