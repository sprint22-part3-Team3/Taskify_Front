export type NavigationButtonProps = {
  direction: 'prev' | 'next';
  disabled?: boolean;
  onClick?: () => void;
  size?: 'default' | 'compact';
};

export type NavigationButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  isHidingOnMobile?: boolean;
  size?: 'default' | 'compact';
};
