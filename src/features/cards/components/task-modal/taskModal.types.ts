import type { Card } from '@/features/cards/types/card.types';

export type TaskModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  card: Card;
};
