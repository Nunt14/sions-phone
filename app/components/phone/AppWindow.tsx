'use client';
import { useEffect, useState, type ReactNode } from 'react';
import type { Origin, StatusBarTheme } from '../../lib/types';
import StatusBar from './StatusBar';
import HomeIndicator from './HomeIndicator';

interface Props {
  origin: Origin;
  background: string;
  statusBar: StatusBarTheme;
  time: string;
  onClosed: () => void;
  children: ReactNode;
}

/** กรอบหน้าต่างแอป: ซูมเข้า-ออกจากตำแหน่งไอคอน + Status bar + Home indicator */
export default function AppWindow({ origin, background, statusBar, time, onClosed, children }: Props) {
  const [open, setOpen] = useState(false);

  // ถ้า background เป็นค่าสีจริง (#hex / rgb / gradient) ให้ใช้เป็น inline style แทน class
  const isCss = /^(#|rgb|hsl|linear-gradient|radial-gradient)/.test(background);

  useEffect(() => {
    let id2 = 0;
    const id1 = requestAnimationFrame(() => { id2 = requestAnimationFrame(() => setOpen(true)); });
    return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2); };
  }, []);

  const close = () => {
    setOpen(false);
    setTimeout(onClosed, 300);
  };

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col overflow-hidden transition-all duration-300 ease-out ${isCss ? '' : background} ${
        open ? 'scale-100 opacity-100 rounded-[48px]' : 'scale-[0.14] opacity-0 rounded-[60px]'
      }`}
      style={{
        transformOrigin: `${origin.x}px ${origin.y}px`,
        ...(isCss ? { background } : {}),
      }}
    >
      <StatusBar time={time} theme={statusBar} />
      <div className="relative flex-1 min-h-0 flex flex-col">{children}</div>
      <HomeIndicator onClick={close} theme={statusBar === 'light' ? 'light' : 'dark'} />
    </div>
  );
}
