import type { Card } from '@/features/cards/types/card.types';

export type TodoEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  card: Card;
  onCardUpdated?: (card: Card) => void;
};
