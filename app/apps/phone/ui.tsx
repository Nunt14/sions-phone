import type { CSSProperties, ReactNode } from 'react';

export const P = {
  blue: '#0a84ff',
  red: '#ff3b30',
  green: '#34c759',
  gray: '#8e8e93',
  line: '#e5e5ea',
  key: '#e5e5ea',
  pill: '#f4f4f6',
  border: '#e6e6e8',
};

export const softPill: CSSProperties = {
  background: '#f8f8f8',
  border: `1px solid ${P.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
};

const Svg = ({ children, size = 22, fill = 'none', sw = 1.8 }: { children: ReactNode; size?: number; fill?: string; sw?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const HANDSET =
  'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z';

export const HandsetIcon = ({ size = 22 }: { size?: number }) => <Svg size={size} fill="currentColor" sw={0}><path d={HANDSET} /></Svg>;
export const HangUpIcon = ({ size = 30 }: { size?: number }) => (
  <Svg size={size} fill="currentColor" sw={0}><path d={HANDSET} transform="rotate(135 12 12)" /></Svg>
);
export const ClockIcon = () => <Svg size={26}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>;
export const PersonIcon = () => <Svg size={26}><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></Svg>;
export const SearchIcon = () => <Svg size={26}><circle cx="10.8" cy="10.8" r="7.2" /><path d="m16.2 16.2 4.5 4.5" /></Svg>;
export const MenuIcon = () => <Svg size={18}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>;
export const BackspaceIcon = () => <Svg size={26}><path d="M9 5h11a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9l-6-7z" /><path d="m12.5 9.5 5 5M17.5 9.5l-5 5" /></Svg>;
export const KeypadDots = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    {[6, 12, 18].flatMap((x) => [4, 9.5, 15, 20.5].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />))}
  </svg>
);
export const SpeakerIcon = () => <Svg size={30}><path d="M4 9v6h4l5 4V5L8 9z" /><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" /></Svg>;
export const VideoIcon = () => <Svg size={30}><rect x="3" y="6.5" width="13" height="11" rx="2" /><path d="m16 10.5 5-3v9l-5-3" /></Svg>;
export const MicOffIcon = () => <Svg size={30}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 11 4.6M12 18v3M19 11a6.5 6.5 0 0 1-.8 3.1M4 4l16 16" /></Svg>;
export const DotsIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
    <circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" />
  </svg>
);
export const ArrowIcon = ({ outgoing }: { outgoing: boolean }) => (
  <Svg size={13} sw={2}>{outgoing ? <path d="M7 17 17 7M9 7h8v8" /> : <path d="M17 7 7 17M15 17H7V9" />}</Svg>
);

/** รูปโปรไฟล์เริ่มต้นแบบ iOS (เงาคนบนพื้นไล่สี) */
export const Avatar = ({ size = 45 }: { size?: number }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} style={{ borderRadius: '50%', flexShrink: 0 }}>
    <defs>
      <linearGradient id="ph-avatar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b9cbe9" />
        <stop offset="1" stopColor="#8a8fcd" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" fill="url(#ph-avatar)" />
    <circle cx="24" cy="19" r="8.5" fill="#fff" />
    <path d="M7 48a17 17 0 0 1 34 0z" fill="#fff" />
  </svg>
);
