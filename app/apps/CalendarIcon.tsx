'use client';
import { useRealTime } from '../hooks/useRealTime';

/** ไอคอนปฏิทินที่แสดงวันที่ปัจจุบันจริง */
export default function CalendarIcon() {
  const { weekdayEn, dayNum } = useRealTime();
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center text-black">
      <div className="text-[10px] font-semibold text-[#ff3b30] leading-none">{weekdayEn.slice(0, 3).toUpperCase()}</div>
      <div className="text-[28px] font-light leading-none mt-0.5">{dayNum}</div>
    </div>
  );
}
