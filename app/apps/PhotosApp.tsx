'use client';
import { useState } from 'react';
import PhotoViewer from './PhotoViewer';
import { TOTAL_PHOTOS, photoSections, photoSrc, range } from '../lib/photos';

export default function PhotosApp() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return <PhotoViewer selected={selected} onSelect={setSelected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-black text-white relative">
      {/* ส่วนหัวแอป (Library และปุ่มด้านบน) */}
      <div className="flex justify-between items-end px-4 pt-2 pb-3 shrink-0">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight leading-none">Library</h1>
          <p className="text-[13px] text-zinc-400 mt-1 font-medium">{TOTAL_PHOTOS} Items</p>
        </div>
        <div className="flex items-center gap-2.5 pb-1">
          <button className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
          </button>
          <button className="px-3.5 py-1.5 bg-zinc-800 rounded-full text-[13px] font-medium active:scale-90 transition-transform">Select</button>
        </div>
      </div>

      {/* รายการรูปภาพแบบ Grid */}
      <div className="flex-1 overflow-y-auto pb-28 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {photoSections.map((sec) => (
          <div key={sec.label} className="grid grid-cols-3 gap-[2px] px-[2px] mb-2">
            {range(sec.from, sec.to).map((n) => (
              <button
                key={n}
                onClick={() => setSelected(n)}
                className="relative aspect-square bg-zinc-900 overflow-hidden active:scale-95 transition-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoSrc(n)} alt={`photo ${n}`} className="w-full h-full object-cover" />
                {n === sec.from && (
                  <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold">
                    {sec.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* แถบเมนูด้านล่างสุด (เพิ่มระยะห่างระหว่างก้อน) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-40 flex items-center gap-4">
        
        {/* ปุ่มไอคอนรูปภาพซ้ายสุด */}
        <button className="pointer-events-auto w-12 h-12 bg-zinc-900/90 backdrop-blur-xl rounded-full flex items-center justify-center text-sky-400 border border-white/15 shadow-2xl shrink-0 active:scale-95 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </button>

        {/* แคปซูลตัวเลือกตรงกลาง (Years / Months / All) */}
        <div className="pointer-events-auto flex items-center bg-zinc-900/90 backdrop-blur-xl px-1.5 py-1.5 rounded-full border border-white/15 shadow-2xl gap-1">
          <span className="text-[12px] font-semibold px-3.5 py-1.5 bg-zinc-700/90 rounded-full text-white shadow-sm">Years</span>
          <span className="text-[12px] font-medium text-zinc-400 px-3 py-1.5">Months</span>
          <span className="text-[12px] font-medium text-zinc-400 px-3 py-1.5">All</span>
        </div>

        {/* ปุ่มค้นหาขวาสุด */}
        <button className="pointer-events-auto w-12 h-12 bg-zinc-900/90 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/15 shadow-2xl shrink-0 active:scale-95 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </button>

      </div>
    </div>
  );
}