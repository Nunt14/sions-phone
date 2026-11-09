import type { CSSProperties, ReactNode } from 'react';
import type { Member } from './data';

export const L = {
  green: '#06c755',
  bubbleMe: '#85e249',
  wall: '#90a8d0',
  gray: '#8e8e93',
  chip: '#f5f5f5',
  border: '#e8e8e8',
  send: '#5468ff',
  meta: '#3d5279',
};

export const outline: CSSProperties = { border: `1px solid ${L.border}`, background: '#fff' };

const Svg = ({ children, size = 22, sw = 1.8 }: { children: ReactNode; size?: number; sw?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const HomeIcon = () => <Svg size={24}><path d="M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></Svg>;
export const ChatIcon = () => <Svg size={24}><path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.1a8.5 8.5 0 1 1 16.3-4.4Z" /></Svg>;
export const SettingsIcon = () => (
  <Svg size={24}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
  </Svg>
);
export const SearchIcon = ({ size = 20 }: { size?: number }) => <Svg size={size}><circle cx="10.8" cy="10.8" r="7" /><path d="m16.2 16.2 4.3 4.3" /></Svg>;
export const ScanIcon = () => <Svg size={26}><path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4M3 12h18" /></Svg>;
export const ImageIcon = () => <Svg size={21}><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="1.6" /><path d="m21 16-5-5-8 8" /></Svg>;
export const CalendarIcon = () => <Svg size={21}><rect x="3.5" y="5" width="17" height="15.5" rx="3" /><path d="M8 3v4M16 3v4M3.5 10h17" /></Svg>;
export const PlusIcon = ({ size = 24 }: { size?: number }) => <Svg size={size} sw={1.6}><path d="M12 4v16M4 12h16" /></Svg>;
export const BackIcon = () => <Svg size={24}><path d="m15 5-7 7 7 7" /></Svg>;
export const PhoneIcon = () => <Svg size={21}><path d="M21 16.5v3a1.5 1.5 0 0 1-1.7 1.5A18.8 18.8 0 0 1 11.1 18a18.5 18.5 0 0 1-5.7-5.7 18.8 18.8 0 0 1-3-8.2A1.5 1.5 0 0 1 3.9 2.5h3a1.5 1.5 0 0 1 1.5 1.3c.1 1 .4 1.9.7 2.8a1.5 1.5 0 0 1-.3 1.6L7.5 9.5a15 15 0 0 0 7 7l1.3-1.3a1.5 1.5 0 0 1 1.6-.3c.9.3 1.8.6 2.8.7a1.5 1.5 0 0 1 .8.9Z" /></Svg>;
export const MenuIcon = () => <Svg size={22}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>;
export const ChevronRight = () => <Svg size={16}><path d="m9 5 7 7-7 7" /></Svg>;
export const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M2.5 20.5 22 12 2.5 3.5l.02 6.6L15 12 2.52 13.9z" /></svg>
);
export const CaretDown = () => (
  <svg viewBox="0 0 10 8" width="9" height="7" fill="currentColor"><path d="M5 8 0 0h10z" /></svg>
);

export interface AvatarSource {
  name: string;
  avatar?: string;
  avatarBg?: string;
  members?: Member[];
}

const DEFAULT_BG = 'linear-gradient(135deg, #9aa5a8, #5f7077)';

function Cell({ m, size, span }: { m: Member; size: number; span?: boolean }) {
  const style: CSSProperties = { gridColumn: span ? 'span 2' : undefined, width: '100%', height: '100%' };
  if (m.avatar) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={m.avatar} alt={m.name} style={{ ...style, objectFit: 'cover' }} />;
  }
  return (
    <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: size * 0.22, background: m.avatarBg ?? DEFAULT_BG }}>
      {m.name[0].toUpperCase()}
    </div>
  );
}

/** รูปโปรไฟล์: มี avatar = รูป / เป็นกลุ่ม = คอลลาจรูปสมาชิก / ไม่งั้นตัวอักษรตัวแรกบนพื้นไล่สี */
export function Avatar({ chat, size = 54 }: { chat: AvatarSource; size?: number }) {
  const base: CSSProperties = { width: size, height: size, minWidth: size, borderRadius: '50%', flexShrink: 0 };

  if (chat.avatar) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={chat.avatar} alt={chat.name} style={{ ...base, objectFit: 'cover' }} />;
  }

  if (chat.members && chat.members.length > 0) {
    const shown = chat.members.slice(0, 4);
    return (
      <div style={{ ...base, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '1fr', gap: 1, background: '#fff' }}>
        {shown.map((mb, i) => (
          <Cell key={mb.name} m={mb} size={size} span={shown.length === 3 && i === 2} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ ...base, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: size * 0.4, background: chat.avatarBg ?? DEFAULT_BG }}>
      {chat.name[0].toUpperCase()}
    </div>
  );
}
