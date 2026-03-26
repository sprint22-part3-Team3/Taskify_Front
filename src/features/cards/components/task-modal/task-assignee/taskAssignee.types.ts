export type TaskAssigneeProps = {
  assignee: {
    profileImageUrl: string | null;
    nickname: string;
    id: number;
  };
  dueDate: string;
};
