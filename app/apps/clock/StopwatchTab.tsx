'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { C, ClockHeader, pad2, row, scrollArea } from './ui';

const fmt = (ms: number) => {
  const cs = Math.floor(ms / 10) % 100;
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / 60000);
  return `${pad2(m)}:${pad2(s)}.${pad2(cs)}`;
};

const circle = (bg: string, color: string): CSSProperties => ({
  ...row,
  justifyContent: 'center',
  width: 74,
  height: 74,
  borderRadius: '50%',
  background: bg,
  color,
  fontSize: 15,
  fontWeight: 500,
  boxShadow: 'inset 0 0 0 3px #000, inset 0 0 0 4px rgba(255,255,255,0.1)',
});

export default function StopwatchTab() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]); // เวลาสะสมตอนกด Lap (ล่าสุดอยู่หน้าสุด)
  const base = useRef(0);
  const startedAt = useRef(0);

  useEffect(() => {
    if (!running) return;
    startedAt.current = performance.now();
    const id = setInterval(() => setMs(base.current + performance.now() - startedAt.current), 30);
    return () => clearInterval(id);
  }, [running]);

  const toggle = () => {
    if (running) {
      base.current += performance.now() - startedAt.current;
      setMs(base.current);
    }
    setRunning((r) => !r);
  };

  const leftAction = () => {
    if (running) {
      setLaps((l) => [ms, ...l]);
    } else {
      base.current = 0;
      setMs(0);
      setLaps([]);
    }
  };

  return (
    <>
      <ClockHeader title="Stopwatch" />

      <div style={{ textAlign: 'center', margin: '34px 0 26px', fontSize: 68, fontWeight: 200, fontVariantNumeric: 'tabular-nums', letterSpacing: -2, flexShrink: 0 }}>
        {fmt(ms)}
      </div>

      <div style={{ ...row, justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
        <button type="button" onClick={leftAction} disabled={!running && ms === 0} style={{ ...circle(C.line, '#fff'), opacity: !running && ms === 0 ? 0.45 : 1 }}>
          {running ? 'Lap' : 'Reset'}
        </button>
        <button type="button" onClick={toggle} style={circle(running ? '#3a1412' : '#0f3d1c', running ? C.red : C.green)}>
          {running ? 'Stop' : 'Start'}
        </button>
      </div>

      <div style={{ ...scrollArea, margin: '22px 16px 0', borderTop: `1px solid ${C.line}` }}>
        {laps.map((total, i) => {
          const prev = laps[i + 1] ?? 0;
          return (
            <div key={laps.length - i} style={{ ...row, justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.line}`, fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>
              <span>Lap {laps.length - i}</span>
              <span>{fmt(total - prev)}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
