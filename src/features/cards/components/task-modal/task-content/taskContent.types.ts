import type { Card } from '@/shared/types/card.types';

export type TaskContentProps = Pick<Card, 'description' | 'title' | 'imageUrl'>;
