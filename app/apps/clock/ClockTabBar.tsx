'use client';
import type { CSSProperties, ReactNode } from 'react';
import { C } from './ui';

export type ClockTab = 'world' | 'alarms' | 'stopwatch' | 'timers';

const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const TABS: { id: ClockTab; label: string; icon: ReactNode }[] = [
  {
    id: 'world',
    label: 'World Clock',
    icon: (
      <Svg>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" />
      </Svg>
    ),
  },
  {
    id: 'alarms',
    label: 'Alarms',
    icon: (
      <Svg>
        <circle cx="12" cy="13" r="7.5" />
        <path d="M12 9v4l2.5 1.5M4 5.5 7 3M20 5.5 17 3M6 20l-1.5 1.5M18 20l1.5 1.5" />
      </Svg>
    ),
  },
  {
    id: 'stopwatch',
    label: 'Stopwatch',
    icon: (
      <Svg>
        <circle cx="12" cy="13.5" r="7.5" />
        <path d="m12 13.5 3-3.5M9.5 2.5h5M12 2.5v3.5M18.5 6.5l1.3-1.3" />
      </Svg>
    ),
  },
  {
    id: 'timers',
    label: 'Timers',
    icon: (
      <Svg>
        <circle cx="12" cy="12.5" r="8.5" />
        <path d="M12 7.5v5l3 2M10 2.5h4" />
      </Svg>
    ),
  },
];

export default function ClockTabBar({ tab, onChange }: { tab: ClockTab; onChange: (t: ClockTab) => void }) {
  const bar: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: 58,
    margin: '0 14px 28px',
    padding: 4,
    borderRadius: 9999,
    background: C.card,
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    flexShrink: 0,
  };

  return (
    <nav style={bar}>
      {TABS.map((t) => {
        const active = t.id === tab;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              borderRadius: 9999,
              background: active ? '#0c0c0d' : 'transparent',
              color: active ? C.orange : '#fff',
              fontSize: 10,
              fontWeight: 500,
            }}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
