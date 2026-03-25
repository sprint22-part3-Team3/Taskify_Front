import type { SubmitEvent } from 'react';
import type { AuthFormProps } from '@/features/auth/components/auth-form/authForm.types';

function AuthForm({ children, onSubmit }: AuthFormProps) {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      className="flex w-full flex-col gap-2 md:gap-4"
      onSubmit={handleSubmit}
      noValidate
    >
      {children}
    </form>
  );
}

export default AuthForm;
