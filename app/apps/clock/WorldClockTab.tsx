'use client';
import { useEffect, useState } from 'react';
import { C, ClockHeader, row, scrollArea } from './ui';

// เพิ่ม/ลบเมืองได้ที่นี่ (tz = ชื่อไทม์โซนมาตรฐาน)
const CITIES = [
  { name: 'Bangkok', tz: 'Asia/Bangkok' },
  { name: 'Tokyo', tz: 'Asia/Tokyo' },
  { name: 'London', tz: 'Europe/London' },
  { name: 'New York', tz: 'America/New_York' },
  { name: 'Sydney', tz: 'Australia/Sydney' },
];

const hhmm = (now: Date, tz: string) =>
  now.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false });

const dayKey = (now: Date, tz?: string) => now.toLocaleDateString('en-CA', tz ? { timeZone: tz } : undefined);

function describe(now: Date, tz: string) {
  const here = new Date(now.toLocaleString('en-US'));
  const there = new Date(now.toLocaleString('en-US', { timeZone: tz }));
  const off = Math.round((there.getTime() - here.getTime()) / 3600000);
  const a = dayKey(now, tz);
  const b = dayKey(now);
  const day = a > b ? 'Tomorrow' : a < b ? 'Yesterday' : 'Today';
  return `${day}, ${off >= 0 ? '+' : ''}${off}HRS`;
}

export default function WorldClockTab() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <ClockHeader title="World Clock" />
      <div style={{ ...scrollArea, margin: '26px 16px 0', borderTop: `1px solid ${C.line}` }}>
        {CITIES.map((c) => (
          <div key={c.tz} style={{ ...row, justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.line}` }}>
            <div>
              <div style={{ fontSize: 12, color: C.gray }}>{describe(now, c.tz)}</div>
              <div style={{ fontSize: 22, marginTop: 2 }}>{c.name}</div>
            </div>
            <div style={{ fontSize: 46, fontWeight: 300, letterSpacing: -1, fontVariantNumeric: 'tabular-nums' }}>
              {hhmm(now, c.tz)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
