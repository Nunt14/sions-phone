'use client';
import { useState } from 'react';
import StatusBar from './StatusBar';
import HomeIndicator from './HomeIndicator';
import { PASSCODE, WALLPAPER } from '../../lib/config';

interface Props {
  time: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

export default function PasscodeScreen({ time, onSuccess, onCancel }: Props) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const press = (key: string) => {
    if (error) return;
    if (key === 'delete') return setCode((c) => c.slice(0, -1));
    if (code.length >= PASSCODE.length) return;

    const next = code + key;
    setCode(next);
    if (next.length === PASSCODE.length) {
      if (next === PASSCODE) {
        setTimeout(onSuccess, 150);
      } else {
        setError(true);
        setTimeout(() => { setCode(''); setError(false); }, 400);
      }
    }
  };

  return (
    <div
      className="absolute inset-0 bg-cover bg-center flex flex-col z-20 text-white"
      style={{ backgroundImage: `url(${WALLPAPER})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl pointer-events-none" />
      <div className="relative z-10 flex flex-col h-full pb-5 px-5">
        <StatusBar time={time} theme="light" />

        <div className="flex-1 mt-10">
          <div className="text-center text-[17px] font-medium mb-6">ใส่รหัสผ่าน</div>

          <div className={`flex justify-center gap-5 mb-10 transition-transform ${error ? '-translate-x-2' : ''}`}>
            {Array.from({ length: PASSCODE.length }).map((_, i) => (
              <div
                key={i}
                className={`w-[13px] h-[13px] border-[1.5px] rounded-full transition-all duration-200 ${
                  error ? 'bg-red-500 border-red-500' : i < code.length ? 'bg-white border-white/80 scale-110' : 'border-white/80'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-[260px] mx-auto">
            {KEYS.map((key, i) =>
              key === '' ? (
                <div key={i} />
              ) : (
                <button
                  key={i}
                  onClick={() => press(key)}
                  className="w-[72px] h-[72px] mx-auto rounded-full bg-white/10 backdrop-blur-md flex justify-center items-center text-[28px] font-light border border-white/5 active:bg-white/30 active:scale-95 transition-all"
                >
                  {key === 'delete' ? '⌫' : key}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex justify-between px-6 py-2">
          <button className="text-[15px] opacity-85">ฉุกเฉิน</button>
          <button className="text-[15px] opacity-85" onClick={onCancel}>ยกเลิก</button>
        </div>
        <HomeIndicator onClick={onCancel} theme="light" />
      </div>
    </div>
  );
}
