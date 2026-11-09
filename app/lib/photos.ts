// รูปอยู่ที่ public/01.jpg ... public/26.jpg
export const TOTAL_PHOTOS = 26;

export const photoSections = [
  { label: '2024', from: 1, to: 8 },
  { label: '2025', from: 9, to: 19 },
  { label: '2026', from: 20, to: 23 },
  { label: 'Today', from: 24, to: 26 },
];

export const photoSrc = (n: number) => `/${String(n).padStart(2, '0')}.jpg`;

export const sectionOf = (n: number) =>
  photoSections.find((s) => n >= s.from && n <= s.to)?.label ?? '';

export const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);
