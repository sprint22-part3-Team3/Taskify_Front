import type { Card } from '@/features/cards/card.types';

export type TaskAssigneeProps = Pick<Card, 'assignee' | 'dueDate'>;
