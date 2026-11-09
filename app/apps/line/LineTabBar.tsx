import type { ReactNode } from 'react';
import { ChatIcon, HomeIcon, SettingsIcon } from './ui';

export type LineTab = 'home' | 'chats' | 'settings';

const TABS: { id: LineTab; label: string; icon: ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'chats', label: 'Chats', icon: <ChatIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

/** แถบแท็บลอยด้านล่าง (ยึดติดขอบล่างของหน้าต่างแอป) */
export default function LineTabBar({ tab, onChange }: { tab: LineTab; onChange: (t: LineTab) => void }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 14,
        right: 14,
        bottom: 26,
        height: 64,
        padding: 4,
        borderRadius: 32,
        display: 'flex',
        background: '#fff',
        border: '1px solid #ececec',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        zIndex: 5,
      }}
    >
      {TABS.map((t) => {
        const active = t.id === tab;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            style={{
              flex: active ? 1.15 : 1,
              borderRadius: 28,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              fontSize: 12,
              fontWeight: 700,
              color: '#111',
              background: active ? '#efeff1' : 'transparent',
            }}
          >
            {t.icon}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
