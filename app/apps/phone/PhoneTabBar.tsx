import type { ReactNode } from 'react';
import { ClockIcon, KeypadDots, P, PersonIcon, SearchIcon } from './ui';

export type PhoneTab = 'calls' | 'contacts' | 'keypad';

const TABS: { id: PhoneTab; label: string; icon: ReactNode }[] = [
  { id: 'calls', label: 'Calls', icon: <ClockIcon /> },
  { id: 'contacts', label: 'Contacts', icon: <PersonIcon /> },
  { id: 'keypad', label: 'Keypad', icon: <KeypadDots /> },
];

/** แถบแท็บลอยด้านล่าง (ยึดติดขอบล่างของหน้าต่างแอป) */
export default function PhoneTabBar({ tab, onChange }: { tab: PhoneTab; onChange: (t: PhoneTab) => void }) {
  return (
    <div style={{ position: 'absolute', left: 16, right: 16, bottom: 26, display: 'flex', alignItems: 'center', gap: 10, zIndex: 5 }}>
      <div style={{ flex: 1, height: 58, padding: 4, borderRadius: 29, display: 'flex', background: P.pill, border: `1px solid ${P.border}` }}>
        {TABS.map((t) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              style={{
                flex: 1,
                borderRadius: 25,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                fontSize: 11,
                background: active ? '#e7e7ec' : 'transparent',
                color: active ? P.blue : '#000',
              }}
            >
              {t.icon}
              {t.label}
            </button>
          );
        })}
      </div>

      <div style={{ width: 58, height: 58, borderRadius: '50%', background: '#fff', border: `1px solid ${P.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
        <SearchIcon />
      </div>
    </div>
  );
}
