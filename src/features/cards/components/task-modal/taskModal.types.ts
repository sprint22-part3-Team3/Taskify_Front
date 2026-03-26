import type { Card } from '@/shared/types/card.types';

export type TaskModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  card: Card;
};
