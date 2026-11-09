import type { CSSProperties, ReactNode } from 'react';

export const W = {
  soft: 'rgba(255,255,255,0.72)',
  line: 'rgba(255,255,255,0.18)',
  bgBottom: '#8db3d6',
};

/** การ์ดโปร่งแสงสีขาวจาง */
export const card: CSSProperties = {
  margin: '0 14px 12px',
  padding: '14px 16px',
  borderRadius: 22,
  background: 'rgba(255,255,255,0.16)',
  backdropFilter: 'blur(10px)',
};

export const tileLabel: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  fontSize: 12,
  letterSpacing: 0.3,
  textTransform: 'uppercase',
  color: W.soft,
};

const Svg = ({ children, size = 22, fill = 'none' }: { children: ReactNode; size?: number; fill?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const ArrowIcon = ({ size = 13 }: { size?: number }) => (
  <Svg size={size} fill="currentColor"><path d="M3 11l18-8-8 18-2-8z" stroke="none" /></Svg>
);
export const MapIcon = () => <Svg><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v14M15 6v14" /></Svg>;
export const ListIcon = () => (
  <Svg>
    <path d="M9 6h12M9 12h12M9 18h12" />
    <circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none" />
  </Svg>
);
export const ThermoIcon = () => <Svg size={12}><path d="M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0z" /></Svg>;
