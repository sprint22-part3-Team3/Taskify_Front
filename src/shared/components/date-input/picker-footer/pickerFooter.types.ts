export type PickerFooterProps = {
  hour: string;
  minute: string;
  hourOptions: string[];
  minuteOptions: string[];
  isEnabled: boolean;
  onChangeHour: (value: string) => void;
  onChangeMinute: (value: string) => void;
};
