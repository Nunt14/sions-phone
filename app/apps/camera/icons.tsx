import type { ReactNode } from 'react';

const Svg = ({ children, size = 24, color = '#fff' }: { children: ReactNode; size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Slash = () => <path d="M4 4l16 16" />;

/** แฟลช: ปิด = มีเส้นขีดทับ / เปิด = สีเหลือง */
export const BoltIcon = ({ on }: { on: boolean }) => (
  <Svg color={on ? '#ffd60a' : '#fff'}>
    <path d="M13 2 5 13.5h6L10 22l9-12h-6.5z" fill={on ? '#ffd60a' : 'none'} />
    {!on && <Slash />}
  </Svg>
);

/** Live Photo */
export const LiveIcon = ({ on }: { on: boolean }) => (
  <Svg color={on ? '#ffd60a' : '#fff'}>
    <circle cx="12" cy="12" r="2.4" />
    <circle cx="12" cy="12" r="6" strokeDasharray="1.6 2.2" />
    <circle cx="12" cy="12" r="9.5" />
    {!on && <Slash />}
  </Svg>
);

/** โหมดกลางคืน */
export const MoonIcon = ({ on }: { on: boolean }) => (
  <Svg color={on ? '#ffd60a' : '#fff'}>
    <path d="M19 14.5A8 8 0 1 1 9.5 5a6.5 6.5 0 0 0 9.5 9.5z" />
    <path d="m17.5 4 1.5-1.5L20.5 4" />
  </Svg>
);

export const ExpandIcon = () => <Svg size={18}><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></Svg>;
export const FlipIcon = () => <Svg size={26}><path d="M20 8a8 8 0 0 0-14-2M4 4v4h4M4 16a8 8 0 0 0 14 2M20 20v-4h-4" /></Svg>;
export const DotsGridIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
    {[6, 12, 18].flatMap((x) => [6, 12, 18].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" />))}
  </svg>
);
