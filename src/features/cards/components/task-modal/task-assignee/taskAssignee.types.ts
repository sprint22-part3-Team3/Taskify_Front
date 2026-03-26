import type { Card } from '@/shared/types/card.types';

export type TaskAssigneeProps = Pick<Card, 'assignee' | 'dueDate'>;
