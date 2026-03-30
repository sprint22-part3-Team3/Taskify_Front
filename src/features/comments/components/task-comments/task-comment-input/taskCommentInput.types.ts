export type TaskCommentInputProps = {
  onSubmit: (content: string) => Promise<boolean>;
  error: string | null;
};
