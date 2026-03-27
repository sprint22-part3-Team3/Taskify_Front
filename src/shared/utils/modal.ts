import { MODAL_CLOSE_DELAY } from '@/shared/constants/modal.constants';

export const runAfterModalClose = (
  callback: () => void,
  delay = MODAL_CLOSE_DELAY
) => {
  window.setTimeout(callback, delay);
};
