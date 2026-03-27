import type { Card } from '@/features/cards/card.types';

export type TaskContentProps = Pick<Card, 'description' | 'title' | 'imageUrl'>;
