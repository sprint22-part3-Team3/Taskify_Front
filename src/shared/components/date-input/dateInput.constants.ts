export const HOUR_OPTIONS = Array.from({ length: 24 }, (_, hour) =>
  String(hour).padStart(2, '0')
);

export const MINUTE_OPTIONS = ['00', '10', '20', '30', '40', '50'];
