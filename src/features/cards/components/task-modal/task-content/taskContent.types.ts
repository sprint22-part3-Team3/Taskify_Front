import type { Card } from '@/features/cards/types/card.types';

export type TaskContentProps = Pick<Card, 'description' | 'title' | 'imageUrl'>;
