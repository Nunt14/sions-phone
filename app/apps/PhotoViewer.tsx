'use client';
import { TOTAL_PHOTOS, photoSrc, range, sectionOf } from '../lib/photos';

interface Props {
  selected: number;
  onSelect: (n: number) => void;
  onBack: () => void;
}

const icon = 'w-5 h-5';
const Svg = ({ d }: { d: string }) => (
  <svg className={icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
  </svg>
);

export default function PhotoViewer({ selected, onSelect, onBack }: Props) {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-black text-white">
      <div className="flex justify-between items-center px-4 py-2 shrink-0">
        <button onClick={onBack} className="w-9 h-9 bg-zinc-800/80 rounded-full text-xl active:scale-90 transition-transform">‹</button>
        <div className="text-center">
          <div className="text-[13px] font-semibold">{sectionOf(selected)}</div>
          <div className="text-[10px] text-zinc-400">{selected} / {TOTAL_PHOTOS}</div>
        </div>
        <button className="w-9 h-9 bg-zinc-800/80 rounded-full text-sm">•••</button>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc(selected)} alt={`photo ${selected}`} className="max-h-full max-w-full object-contain rounded-lg" />
      </div>

      <div className="py-2 flex gap-1.5 overflow-x-auto px-4 shrink-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {range(1, TOTAL_PHOTOS).map((n) => (
          <button
            key={n}
            onClick={() => onSelect(n)}
            className={`w-10 h-10 rounded-md overflow-hidden shrink-0 transition-all ${n === selected ? 'ring-2 ring-white scale-110' : 'opacity-40'}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoSrc(n)} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center px-5 pt-3 pb-8 border-t border-white/5 shrink-0">
        <button className="w-[50px] h-[50px] bg-zinc-800/80 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <Svg d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </button>
        <div className="flex items-center justify-around bg-zinc-800/80 py-2.5 rounded-full w-[160px]">
          <button className="active:scale-90 active:text-red-500"><Svg d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></button>
          <button className="active:scale-90"><Svg d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></button>
          <button className="active:scale-90"><Svg d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></button>
        </div>
        <button className="w-[50px] h-[50px] bg-zinc-800/80 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <Svg d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </button>
      </div>
    </div>
  );
}
