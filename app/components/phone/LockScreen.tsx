'use client';
import { useState } from 'react';
import StatusBar from './StatusBar';
import HomeIndicator from './HomeIndicator';
import { WALLPAPER } from '../../lib/config';

interface Props {
  time: string;
  date: string;
  onUnlock: () => void;
}

export default function LockScreen({ time, date, onUnlock }: Props) {
  const [flashlight, setFlashlight] = useState(false);

  const circle = 'w-[62px] h-[62px] rounded-full flex items-center justify-center border transition-all active:scale-90';

  return (
    <div
      onClick={onUnlock}
      className="absolute inset-0 bg-cover bg-center flex flex-col justify-between z-10 text-white cursor-pointer"
      style={{ backgroundImage: `url(${WALLPAPER})` }}
    >
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      {flashlight && <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] pointer-events-none z-20" />}

      <StatusBar time={time} theme="light" />

      <div className="text-center mt-12 flex-1 relative z-10">
        <div className="text-[80px] font-extralight tracking-tighter leading-none drop-shadow-lg">{time}</div>
        <div className="text-lg font-medium mt-2 opacity-90 drop-shadow-md">{date}</div>
      </div>

      <div className="relative z-30 pb-5">
        <div className="text-center text-[13px] opacity-90 mb-5 animate-pulse drop-shadow-md font-medium pointer-events-none">
          เลื่อนขึ้นหรือแตะเพื่อปลดล็อก
        </div>
        <div className="flex justify-between px-[38px] pb-4">
          <button
            onClick={(e) => { e.stopPropagation(); setFlashlight((v) => !v); }}
            className={`${circle} ${flashlight ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.8)]' : 'bg-black/30 backdrop-blur-xl border-white/15 text-white'}`}
            aria-label="ไฟฉาย"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M9 2h6v4l-1.5 2.5V21a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V8.5L9 6V2z" />
              <path d="M12 11v2.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onUnlock(); }}
            className={`${circle} bg-black/30 backdrop-blur-xl border-white/15 active:bg-white/40`}
            aria-label="กล้อง"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
          </button>
        </div>
      </div>
      <HomeIndicator onClick={onUnlock} theme="light" />
    </div>
  );
}
