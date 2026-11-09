import type { ReactNode } from 'react';
import DynamicIsland from './DynamicIsland';

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 select-none">
      <div
        data-phone-frame
        className="relative w-[340px] h-[700px] bg-black rounded-[48px] border border-white/10 shadow-[0_0_0_10px_#27272a,0_30px_60px_rgba(0,0,0,0.7)] overflow-hidden"
      >
        <DynamicIsland />
        {children}
      </div>
    </main>
  );
}
