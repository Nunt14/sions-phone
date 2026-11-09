import type { CSSProperties, ReactNode } from 'react';

export const N = {
  listBg: '#f2f2f7',
  gray: '#8e8e93',
  line: '#e5e5ea',
  border: '#e3e3e8',
};

/** ปุ่มวงกลมสีขาวขอบบาง (ปุ่มย้อนกลับ, ปุ่ม ..., ปุ่มเขียนโน้ต) */
export const circleBtn: CSSProperties = {
  width: 42,
  height: 42,
  flexShrink: 0,
  borderRadius: '50%',
  background: '#fff',
  border: `1px solid ${N.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
};

/** แคปซูลสีขาวขอบบาง (กลุ่มปุ่ม / ช่อง Search) */
export const pill: CSSProperties = {
  height: 42,
  borderRadius: 21,
  background: '#fff',
  border: `1px solid ${N.border}`,
  display: 'flex',
  alignItems: 'center',
  color: '#000',
};

/** แถบลอยด้านล่าง (ยึดติดขอบล่างของหน้าต่างแอป) */
export const floatingBar: CSSProperties = {
  position: 'absolute',
  left: 16,
  right: 16,
  bottom: 26,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  zIndex: 5,
};

const Svg = ({ children, size = 22 }: { children: ReactNode; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const BackIcon = () => <Svg><path d="m15 5-7 7 7 7" /></Svg>;
export const SearchIcon = () => <Svg size={20}><circle cx="10.8" cy="10.8" r="7" /><path d="m16.2 16.2 4.3 4.3" /></Svg>;
export const ComposeIcon = () => (
  <Svg>
    <path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
    <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
  </Svg>
);
export const ShareIcon = () => (
  <Svg>
    <path d="M12 15V3M8 7l4-4 4 4" />
    <path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
  </Svg>
);
export const ChecklistIcon = () => (
  <Svg>
    <circle cx="5" cy="7" r="1.6" />
    <path d="M10 7h10" />
    <circle cx="5" cy="17" r="1.6" />
    <path d="M10 17h10" />
  </Svg>
);
export const ClipIcon = () => (
  <Svg>
    <path d="m21 11-8.5 8.5a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 7" />
  </Svg>
);
export const DotsIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="19" cy="12" r="1.8" />
  </svg>
);
