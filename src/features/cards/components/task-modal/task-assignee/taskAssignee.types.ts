import type { Card } from '@/features/cards/types/card.types';

export type TaskAssigneeProps = Pick<Card, 'assignee' | 'dueDate'>;
