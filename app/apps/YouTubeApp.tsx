import { photoSrc } from '../lib/photos';

const CHIPS = ['ทั้งหมด', 'เพลง', 'สด', 'เต้น', 'ล่าสุด'];
const VIDEOS = [
  { img: 5, title: 'เบื้องหลังซ้อมเต้น ep.1', ch: 'Jai Channel', meta: '1.2 แสนครั้ง • 2 วันที่แล้ว', len: '12:04' },
  { img: 14, title: 'Vlog วันหยุดสบายๆ', ch: 'Jai Channel', meta: '8.4 หมื่นครั้ง • 1 สัปดาห์ที่แล้ว', len: '08:31' },
  { img: 22, title: 'คัฟเวอร์เต้นรวมทีม', ch: 'Dance Camp', meta: '3.4 แสนครั้ง • 3 สัปดาห์ที่แล้ว', len: '04:18' },
];

export default function YouTubeApp() {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-[#0f0f0f] text-white">
      <div className="flex justify-between items-center px-4 py-2 shrink-0">
        <div className="flex items-center gap-1 text-[18px] font-bold tracking-tight">
          <span className="w-7 h-5 bg-red-600 rounded-md text-[9px] flex items-center justify-center">▶</span>YouTube
        </div>
        <span className="text-lg">⌕</span>
      </div>

      <div className="flex gap-2 px-3 pb-2 overflow-x-auto shrink-0 [&::-webkit-scrollbar]:hidden">
        {CHIPS.map((c, i) => (
          <span key={c} className={`px-3 py-1 rounded-lg text-[13px] whitespace-nowrap ${i === 0 ? 'bg-white text-black' : 'bg-zinc-800'}`}>{c}</span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-20 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {VIDEOS.map((v) => (
          <div key={v.title} className="mb-4">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoSrc(v.img)} alt={v.title} className="w-full aspect-video object-cover" />
              <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-[11px] px-1 rounded">{v.len}</span>
            </div>
            <div className="px-3 pt-2">
              <div className="text-[14px] font-medium leading-snug">{v.title}</div>
              <div className="text-[12px] text-zinc-400">{v.ch} • {v.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
