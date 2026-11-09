'use client';
import { useEffect, useRef } from 'react';
import TopBar from './calendar/TopBar';
import BottomBar from './calendar/BottomBar';
import MonthSection from './calendar/MonthSection';
import { YEAR } from './calendar/data';
import { K } from './calendar/ui';

const MONTHS = Array.from({ length: 12 }, (_, i) => i);

export default function CalendarApp() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const monthRefs = useRef<(HTMLDivElement | null)[]>([]);

  const now = new Date();
  const today = { y: now.getFullYear(), m: now.getMonth(), d: now.getDate() };
  const todayMonth = today.y === YEAR ? today.m : 0;

  const goTo = (index: number, smooth: boolean) => {
    const el = monthRefs.current[index];
    if (!el || !scrollRef.current) return;
    scrollRef.current.scrollTo({ top: el.offsetTop - 8, behavior: smooth ? 'smooth' : 'auto' });
  };

  // เปิดแอปแล้วเลื่อนไปที่เดือนปัจจุบันทันที
  useEffect(() => {
    goTo(todayMonth, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // หาเดือนที่อยู่บนสุดของจอตอนนี้ แล้วเลื่อนไปเดือนก่อน/ถัดไป
  const step = (delta: number) => {
    const top = scrollRef.current?.scrollTop ?? 0;
    let current = 0;
    monthRefs.current.forEach((el, i) => {
      if (el && el.offsetTop - 60 <= top) current = i;
    });
    goTo(Math.min(11, Math.max(0, current + delta)), true);
  };

  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: K.bg, color: '#000' }}>
      <TopBar onPrev={() => step(-1)} onNext={() => step(1)} />

      <div
        ref={scrollRef}
        style={{ position: 'relative', flex: 1, minHeight: 0, overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 120 }}
      >
        {MONTHS.map((m) => (
          <MonthSection key={m} month={m} today={today} innerRef={(el) => { monthRefs.current[m] = el; }} />
        ))}
      </div>

      <BottomBar onToday={() => goTo(todayMonth, true)} />
    </div>
  );
}
