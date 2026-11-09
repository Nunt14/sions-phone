'use client';
import { useEffect, useState, type CSSProperties } from 'react';
import { C, ClockHeader, pad2, row } from './ui';

const PRESETS = [1, 3, 5, 10]; // นาที

const fmt = (s: number) => `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;

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

export default function TimersTab() {
  const [total, setTotal] = useState(300);
  const [left, setLeft] = useState(300);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          setRunning(false);
          setDone(true);
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const pick = (min: number) => {
    setTotal(min * 60);
    setLeft(min * 60);
    setDone(false);
  };

  const startPause = () => {
    if (left === 0) setLeft(total);
    setDone(false);
    setRunning((r) => !r);
  };

  const cancel = () => {
    setRunning(false);
    setDone(false);
    setLeft(total);
  };

  const idle = !running && left === total;

  return (
    <>
      <ClockHeader title="Timers" />

      <div style={{ textAlign: 'center', margin: '40px 0 8px', fontSize: 76, fontWeight: 200, fontVariantNumeric: 'tabular-nums', letterSpacing: -2, color: done ? C.orange : '#fff' }}>
        {fmt(left)}
      </div>
      <div style={{ textAlign: 'center', height: 20, fontSize: 14, color: C.orange }}>{done ? "Time's up" : ''}</div>

      <div style={{ ...row, justifyContent: 'center', gap: 10, marginTop: 22 }}>
        {PRESETS.map((m) => (
          <button
            key={m}
            type="button"
            disabled={running}
            onClick={() => pick(m)}
            style={{ padding: '8px 14px', borderRadius: 9999, fontSize: 14, background: total === m * 60 ? C.line : C.card, color: '#fff', opacity: running ? 0.5 : 1 }}
          >
            {m} min
          </button>
        ))}
      </div>

      <div style={{ ...row, justifyContent: 'space-between', padding: '0 24px', marginTop: 34 }}>
        <button type="button" onClick={cancel} disabled={idle && !done} style={{ ...circle(C.line, '#fff'), opacity: idle && !done ? 0.45 : 1 }}>
          Cancel
        </button>
        <button type="button" onClick={startPause} style={circle(running ? '#3d2a06' : '#0f3d1c', running ? C.orange : C.green)}>
          {running ? 'Pause' : idle || done ? 'Start' : 'Resume'}
        </button>
      </div>
    </>
  );
}
