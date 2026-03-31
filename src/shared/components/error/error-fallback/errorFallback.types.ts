export type ErrorFallbackProps = {
  message: string;
  onRetry?: () => void;
  variant?: 'part' | 'full';
  className?: string;
};
