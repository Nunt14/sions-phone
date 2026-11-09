import type { CSSProperties, ReactNode } from 'react';

export const K = {
  bg: '#fafafa',
  pill: '#efeff0',
  pillBorder: '#e2e2e4',
  line: '#dedee0',
  gray: '#8e8e93',
  red: '#ff3b4a',
};

export const pillBase: CSSProperties = {
  height: 43,
  borderRadius: 22,
  background: K.pill,
  border: `1px solid ${K.pillBorder}`,
  display: 'flex',
  alignItems: 'center',
  color: '#000',
};

const Svg = ({ children, size = 22 }: { children: ReactNode; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const ChevronLeft = ({ size = 22 }: { size?: number }) => <Svg size={size}><path d="m15 5-7 7 7 7" /></Svg>;
export const ChevronRight = () => <Svg><path d="m9 5 7 7-7 7" /></Svg>;
export const PlusIcon = () => <Svg size={20}><path d="M12 5v14M5 12h14" /></Svg>;
export const AlertIcon = () => (
  <Svg size={24}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5" />
    <circle cx="12" cy="16.3" r="0.6" fill="currentColor" />
  </Svg>
);
export const InboxIcon = () => (
  <Svg size={24}>
    <path d="M4 13.5 6.5 5.5A1.5 1.5 0 0 1 8 4.5h8a1.5 1.5 0 0 1 1.5 1l2.5 8" />
    <path d="M4 13.5V18a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 18v-4.5h-5a3 3 0 0 1-6 0z" />
  </Svg>
);
