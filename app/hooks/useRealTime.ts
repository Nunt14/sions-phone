'use client';
import { useEffect, useState } from 'react';

export function useRealTime() {
  const [time, setTime] = useState('00:00');
  const [date, setDate] = useState('');
  const [weekdayEn, setWeekdayEn] = useState('');
  const [dayNum, setDayNum] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' }));
      setWeekdayEn(now.toLocaleDateString('en-US', { weekday: 'long' }));
      setDayNum(String(now.getDate()));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return { time, date, weekdayEn, dayNum };
}
