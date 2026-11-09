import type { StatusBarTheme } from '../../lib/types';

export default function StatusBar({ time, theme = 'light' }: { time: string; theme?: StatusBarTheme }) {
  const dark = theme === 'dark';
  const textColor = dark ? 'text-black' : 'text-white drop-shadow-md';
  const borderColor = dark ? 'border-black/40' : 'border-white/80';
  const bgColor = dark ? 'bg-black' : 'bg-white';
  const tailColor = dark ? 'bg-black/40' : 'bg-white/80';

  return (
    <div className={`flex justify-between items-center px-6 pt-3 text-[13px] font-semibold relative z-[80] w-full h-[40px] shrink-0 ${textColor}`}>
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-bold tracking-tight">5G</span>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 3C7.5 3 3.3 4.6.4 7.2l1.6 2C4.3 6.9 7.9 5.5 12 5.5s7.7 1.4 10 3.7l1.6-2C20.7 4.6 16.5 3 12 3zm0 5C9 8 6.2 9 4.1 10.9l1.6 2C7.3 11.4 9.5 10.5 12 10.5s4.7.9 6.3 2.4l1.6-2C17.8 9 15 8 12 8zm0 5c-1.5 0-2.9.5-4.1 1.4l1.6 2c.7-.6 1.6-1 2.5-1s1.8.4 2.5 1l1.6-2C14.9 13.5 13.5 13 12 13zm0 5c-.6 0-1.1.2-1.5.5l1.5 1.9 1.5-1.9c-.4-.3-.9-.5-1.5-.5z" />
        </svg>
        <div className={`w-[25px] h-[12px] border rounded-sm relative ${borderColor}`}>
          <div className={`absolute inset-[1.5px] rounded-[2.5px] ${bgColor}`} />
          <div className={`absolute -right-[3.5px] top-[2.5px] w-[1.5px] h-[4px] rounded-r-sm ${tailColor}`} />
        </div>
      </div>
    </div>
  );
}
