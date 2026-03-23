export type NavigationButtonProps = {
  direction: 'prev' | 'next';
  disabled?: boolean;
  onClick?: () => void;
};

export type NavigationButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
  hasPrevDisabled?: boolean;
  hasNextDisabled?: boolean;
  isHidingOnMobile?: boolean;
};
