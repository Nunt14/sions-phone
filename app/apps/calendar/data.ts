// ตั้งค่าปฏิทิน แก้ปี/จุดสีนัดหมายได้ที่ไฟล์นี้
export const YEAR = 2026;

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export type DotColor = 'blue' | 'purple' | 'green' | 'orange';

export const DOT_COLORS: Record<DotColor, string> = {
  blue: '#0a84ff',
  purple: '#af52de',
  green: '#30d158',
  orange: '#ff9f0a',
};

// จุดสีใต้วันที่ (นัดหมาย) รูปแบบ 'YYYY-MM-DD'
export const EVENTS: Record<string, DotColor> = {
  '2026-01-01': 'blue',
  '2026-01-02': 'blue',
  '2026-05-31': 'blue',
  '2026-06-01': 'blue',
  '2026-06-03': 'blue',
  '2026-06-18': 'purple',
  '2026-11-04': 'purple', //
};
