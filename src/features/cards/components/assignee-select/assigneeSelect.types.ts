import type { AvatarUser } from '@/shared/types/user.types';

export type AssigneeSelectProps = {
  label: string;
  selectedAssignee: AvatarUser | null;
  assigneeOptions: AvatarUser[];
  onSelect: (user: AvatarUser | null) => void;
  required?: boolean;
  placeholder?: string;
};
