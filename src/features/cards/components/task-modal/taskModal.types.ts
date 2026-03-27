import type { Card } from '@/features/cards/card.types';

export type TaskModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  card: Card;
};
