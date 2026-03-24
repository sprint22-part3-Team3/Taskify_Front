export type NavigationButtonProps = {
  direction: 'prev' | 'next';
  disabled?: boolean;
  onClick?: () => void;
};

export type NavigationButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  isHidingOnMobile?: boolean;
};
