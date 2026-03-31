import { ModalLayout } from './modal-layout';
import { ModalHeader } from './modal-header';
import { ModalMain } from './modal-main';
import { ModalFooter } from './modal-footer';

/**
 * 공통 모달 컴포넌트*
 * - `Modal`: isOpen, onClose 상태를 관리하는 최상위 레이아웃 컨테이너
 * - `Modal.Header`: 제목과 아이콘(닫기, 메뉴)을 배치하는 상단 영역
 * - `Modal.Main`: 폼이나 텍스트가 들어가는 핵심 컨텐츠 영역
 * - `Modal.Footer`: 액션 버튼을 배치하는 하단 영역 (버튼 너비 균등 분할 적용)
 *
 * ※ 모든 파츠는 `className` 을 통해 세부 디자인 수정 가능
 *
 * @example
 * <Modal isOpen={isOpen} onClose={closeModal}>
 *   <Modal.Header title="할 일 수정" hasCloseIcon />
 *   <Modal.Main>
 *     <form id="my-form">...</form>
 *   </Modal.Main>
 *   <Modal.Footer>
 *     <Button theme="cancel" onClick={closeModal}>취소</Button>
 *     <Button type="submit" form="my-form">수정</Button>
 *   </Modal.Footer>
 * </Modal>
 */
export const Modal = Object.assign(ModalLayout, {
  Header: ModalHeader,
  Main: ModalMain,
  Footer: ModalFooter,
});
