'use client';
import { useEffect, useState, type ReactNode } from 'react';
import StatusBar from '../../components/phone/StatusBar';
import { useRealTime } from '../../hooks/useRealTime';

const svg = (children: ReactNode) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Btn = ({ label, icon, bg = 'rgba(255,255,255,0.18)', onClick }: { label: string; icon: ReactNode; bg?: string; onClick?: () => void }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
    <button type="button" onClick={onClick} aria-label={label} style={{ width: 78, height: 78, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </button>
    <span style={{ fontSize: 14, color: '#fff' }}>{label}</span>
  </div>
);

const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

/** หน้าโทรแบบ iPhone: นับวินาที + เล่นเสียง v3.mp3 วนลูป กดวางแล้วเสียงดับทันที */
export default function CallScreen({ name, onEnd }: { name: string; onEnd: () => void }) {
  const { time } = useRealTime();
  const [sec, setSec] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const a = new Audio('/v3.mp3');
    a.loop = true; // เสียงจบแล้ววนใหม่
    a.play().catch(() => {});
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => {
      clearInterval(t);
      a.pause(); // ปิดหน้าโทร (กดวาง) → เสียงดับทันที
      a.currentTime = 0;
    };
  }, []);

  return (
    <div style={{ position: 'absolute', top: -40, left: 0, right: 0, bottom: 0, zIndex: 300, background: '#252525', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <StatusBar time={time} theme="light" />

      <div style={{ textAlign: 'center', marginTop: 90 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#8e8e93' }}>{mmss(sec)}</div>
        <div style={{ fontSize: 38, fontWeight: 700, marginTop: 6 }}>{name}</div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 22, padding: '0 28px 50px', justifyItems: 'center' }}>
        <Btn label="Audio" icon={svg(<><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" /></>)} />
        <Btn label="FaceTime" icon={svg(<><rect x="3" y="7" width="13" height="10" rx="2.5" /><path d="m16 11 5-3v8l-5-3" /></>)} />
        <Btn
          label="Mute"
          bg={muted ? '#fff' : undefined}
          onClick={() => setMuted((m) => !m)}
          icon={
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={muted ? '#111' : '#fff'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M4 4l16 16" />
            </svg>
          }
        />
        <Btn label="More" icon={svg(<><circle cx="5" cy="12" r="1.2" fill="#fff" /><circle cx="12" cy="12" r="1.2" fill="#fff" /><circle cx="19" cy="12" r="1.2" fill="#fff" /></>)} />
        <Btn
          label="End"
          bg="#f20c0c"
          onClick={onEnd}
          icon={svg(<path d="M3 14.5c5-4 13-4 18 0l-2.2 2.6-3-1.4v-2.4a10 10 0 0 0-5.6 0v2.4l-3 1.4L3 14.5Z" fill="#fff" />)}
        />
        <Btn label="Keypad" icon={svg(<>{[5, 12, 19].map((x) => [5, 12, 19].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.3" fill="#fff" />))}<circle cx="12" cy="22" r="1.3" fill="#fff" /></>)} />
      </div>

      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 130, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.9)' }} />
    </div>
  );
}