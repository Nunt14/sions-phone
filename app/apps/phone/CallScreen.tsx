'use client';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import StatusBar from '../../components/phone/StatusBar';
import { useRealTime } from '../../hooks/useRealTime';
import { DotsIcon, HangUpIcon, KeypadDots, MicOffIcon, SpeakerIcon, VideoIcon } from './ui';

// ถ้าอยากให้สาย "ต่อติด" อัตโนมัติ ใส่ตัวเลขมิลลิวินาที เช่น 4000 (แล้วจะนับเวลาแทนคำว่า Calling…)
const CONNECT_AFTER_MS: number | null = null;

const mm = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function Btn({ label, active, red, onClick, children }: { label: string; active?: boolean; red?: boolean; onClick?: () => void; children: ReactNode }) {
  const circle: CSSProperties = {
    width: 76,
    height: 76,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: red ? '#f0000f' : active ? '#fff' : 'rgba(255,255,255,0.18)',
    color: red ? '#fff' : active ? '#000' : '#fff',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <button type="button" onClick={onClick} aria-label={label} style={circle}>{children}</button>
      <span style={{ fontSize: 13, color: '#fff' }}>{label}</span>
    </div>
  );
}

/** หน้าจอกำลังโทรออก — คลุมทั้งหน้าต่างแอป (รวมแถบสถานะ) */
export default function CallScreen({ label, onEnd }: { label: string; onEnd: () => void }) {
  const { time } = useRealTime();
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [connected, setConnected] = useState(false);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    if (CONNECT_AFTER_MS === null) return;
    const t = setTimeout(() => setConnected(true), CONNECT_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!connected) return;
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [connected]);

  return (
    <div style={{ position: 'absolute', top: -40, left: 0, right: 0, bottom: 0, zIndex: 200, background: '#262626', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <StatusBar time={time} theme="light" />

      <div style={{ textAlign: 'center', marginTop: 70, padding: '0 20px' }}>
        <div style={{ fontSize: 19, fontWeight: 700, color: '#8e8e93' }}>{connected ? mm(sec) : 'Calling…'}</div>
        <div style={{ marginTop: 8, fontSize: 32, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</div>
      </div>

      <div style={{ marginTop: 'auto', padding: '0 24px 56px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 26, justifyItems: 'center' }}>
        <Btn label="Audio" active={speaker} onClick={() => setSpeaker((v) => !v)}><SpeakerIcon /></Btn>
        <Btn label="FaceTime"><VideoIcon /></Btn>
        <Btn label="Mute" active={mute} onClick={() => setMute((v) => !v)}><MicOffIcon /></Btn>
        <Btn label="More"><DotsIcon /></Btn>
        <Btn label="End" red onClick={onEnd}><HangUpIcon /></Btn>
        <Btn label="Keypad"><KeypadDots size={28} /></Btn>
      </div>

      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 130, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.85)' }} />
    </div>
  );
}
