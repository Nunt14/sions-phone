'use client';
import { useRealTime } from '../../hooks/useRealTime';
import { CALENDAR_EVENT } from '../../lib/config';

export default function CalendarWidget() {
  const { weekdayEn, dayNum } = useRealTime();
  return (
    <div className="col-span-2 h-[126px] bg-white rounded-[28px] p-3.5 text-black flex flex-col justify-between shadow-lg border border-white/20">
      <div>
        <div className="text-[11px] font-bold text-[#ff3b30] tracking-wider">{weekdayEn.toUpperCase()}</div>
        <div className="text-[44px] font-light leading-none tracking-tight mt-0.5">{dayNum}</div>
      </div>
      <div className="border-l-2 border-purple-600 pl-2 py-0.5">
        <div className="text-[11px] font-medium text-zinc-800 leading-tight">
          {CALENDAR_EVENT.when} · {CALENDAR_EVENT.title}
        </div>
        <div className="text-[10px] text-zinc-400">{CALENDAR_EVENT.time}</div>
      </div>
    </div>
  );
}
