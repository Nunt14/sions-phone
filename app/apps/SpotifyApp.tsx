import type { CSSProperties, ReactNode } from 'react';
import { photoSrc } from '../lib/photos';

// หน้าเดียว (Liked Songs) ไม่มีการเปลี่ยนหน้า
// ใส่รูปปก: ตั้งค่า cover เป็นพาธรูปของคุณ เช่น '/covers/perfect.jpg' (วางไฟล์ไว้ใน public/covers/)
// ถ้าเว้น cover ไว้ จะแสดงเป็นกรอบสีแทนจนกว่าจะใส่รูป
type Song = { title: string; artist: string; cover?: string; tint: string };

const SONGS: Song[] = [
  { title: 'ข้างกาย (With You)', artist: 'Safeplanet', cover: '', tint: '#b5b3f8' },
  { title: 'ลม', artist: 'SCRUBB', cover: '', tint: '#5a5a66' },
  { title: 'บุพเพสันนิวาส', artist: 'ไอซ์ ศรัณยู วินัยพานิช', cover: '', tint: '#8a3a2a' },
  { title: 'สองใจ', artist: 'ดา เอ็นโดรฟิน', cover: '', tint: '#6a2a4a' },
  { title: 'รักแท้อยู่เหนือกาลเวลา', artist: 'กัน นภัทร', cover: '', tint: '#2a4a6a' },
  { title: 'Perfect', artist: 'Ed Sheeran', cover: '', tint: '#7a5a2a' },
  { title: 'All of Me', artist: 'John Legend', cover: '', tint: '#3a3a5a' },
  { title: "Can't Help Falling in Love", artist: 'Elvis Presley', cover: '', tint: '#5a2a2a' },
  { title: 'A Thousand Years', artist: 'Christina Perri', cover: '', tint: '#2a5a5a' },
  { title: "I'm Yours", artist: 'Jason Mraz', cover: '', tint: '#6a6a2a' },
];

const CHIPS = ['All', 'Upbeat', 'Pop', 'Chill'];
const GREEN = '#1ed760';
const MUTED = '#b3b3b3';
const NOW = SONGS[0];

// ใช้ inline style ทั้งหมด เพื่อไม่ให้ CSS ของ shell มือถือทับ
const S: Record<string, CSSProperties> = {
  root: { flex: 1, minHeight: 0, width: '100%', position: 'relative', background: '#121212', color: '#fff', overflow: 'hidden' },
  scroll: { position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 150, scrollbarWidth: 'none', msOverflowStyle: 'none' },
  glow: { position: 'absolute', top: 0, left: 0, right: 0, height: 290, background: 'linear-gradient(180deg, #4160fa 0%, #2b3cae 45%, #121212 100%)' },
  inner: { position: 'relative', padding: '0 16px' },
  searchRow: { display: 'flex', gap: 8, marginTop: 12 },
  search: { flex: 1, height: 38, borderRadius: 6, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', fontSize: 12.5, fontWeight: 700 },
  sort: { width: 63, height: 38, borderRadius: 6, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 },
  title: { fontSize: 28, fontWeight: 800, margin: '22px 0 0', letterSpacing: -0.5, lineHeight: 1.15 },
  sub: { fontSize: 12, color: MUTED, margin: '6px 0 0' },
  controls: { display: 'flex', alignItems: 'center', marginTop: 12, gap: 14 },
  chips: { display: 'flex', gap: 8, marginTop: 22 },
  chip: { height: 30, padding: '0 14px', borderRadius: 15, display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 500 },
  row: { display: 'flex', alignItems: 'center', gap: 12, height: 66 },
  rowTitle: { fontSize: 15, fontWeight: 600, color: '#fff', lineHeight: 1.3 },
  rowArtist: { fontSize: 12, color: MUTED, lineHeight: 1.3 },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  mini: { margin: '0 8px', height: 51, borderRadius: 7, background: '#2b2b2b', display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px' },
  nav: { display: 'flex', justifyContent: 'space-around', padding: '10px 0 30px', background: 'rgba(18,18,18,0.97)', marginTop: 4 },
  navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontSize: 10, minWidth: 64 },
};

const Svg = ({ size = 24, stroke = '#fff', sw = 1.8, fill = 'none', children }: { size?: number; stroke?: string; sw?: number; fill?: string; children: ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {children}
  </svg>
);

const Cover = ({ song, size, radius = 3 }: { song: Song; size: number; radius?: number }) =>
  song.cover ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={song.cover} alt={song.title} style={{ width: size, height: size, borderRadius: radius, objectFit: 'cover', flexShrink: 0 }} />
  ) : (
    <div style={{ width: size, height: size, borderRadius: radius, flexShrink: 0, background: `linear-gradient(135deg, ${song.tint}, #1a1a1a)` }} />
  );

export default function SpotifyApp() {
  return (
    <div style={S.root}>
      {/* ซ่อนแถบเลื่อนด้านข้าง (ยังเลื่อนได้ตามปกติ) */}
      <style>{`.spotify-scroll::-webkit-scrollbar{display:none;width:0;height:0}`}</style>
      <div className="spotify-scroll" style={S.scroll}>
        <div style={S.glow} />
        <div style={S.inner}>
          {/* ปุ่มย้อนกลับ */}
          <div style={{ paddingTop: 28, height: 24 }}>
            <Svg size={24} sw={2}><path d="M15 5l-7 7 7 7" /></Svg>
          </div>

          {/* ค้นหา + Sort */}
          <div style={S.searchRow}>
            <div style={S.search}>
              <Svg size={18} sw={2}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L20 20" /></Svg>
              <span>Find in Liked Songs</span>
            </div>
            <div style={S.sort}>Sort</div>
          </div>

          <h1 style={S.title}>Liked Songs</h1>
          <p style={S.sub}>{SONGS.length} songs</p>

          {/* ปก / ดาวน์โหลด / shuffle / play */}
          <div style={S.controls}>
            <Cover song={NOW} size={38} radius={4} />
            <Svg size={22} stroke={MUTED} sw={1.6}>
              <circle cx="12" cy="12" r="9" /><path d="M12 7.5v8M8.5 12l3.5 3.5 3.5-3.5" />
            </Svg>
            <div style={{ flex: 1 }} />
            <Svg size={24} stroke={GREEN} sw={1.8}>
              <path d="M3 17h3c2 0 3.5-1 4.8-3l2.4-4C14.5 8 16 7 18 7h3M3 7h3c2 0 3.5 1 4.8 3M13.2 14c1.3 2 2.8 3 4.8 3h3M18 4l3 3-3 3M18 14l3 3-3 3" />
            </Svg>
            <div style={{ width: 47, height: 47, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Svg size={24} stroke="#000" fill="#000" sw={1}><path d="M8 5.5v13l11-6.5z" /></Svg>
            </div>
          </div>

          {/* ชิป */}
          <div style={S.chips}>
            {CHIPS.map((c, i) => (
              <div key={c} style={{ ...S.chip, background: i === 0 ? GREEN : '#2a2a2a', color: i === 0 ? '#000' : '#fff' }}>{c}</div>
            ))}
          </div>

          {/* Add songs */}
          <div style={{ ...S.row, marginTop: 10, height: 56 }}>
            <div style={{ width: 47, height: 47, background: '#2a2a2a', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Svg size={30} stroke={MUTED} sw={1.4}><path d="M12 4v16M4 12h16" /></Svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 500 }}>Add songs</span>
          </div>

          {/* รายการเพลง */}
          {SONGS.map((s) => (
            <div key={s.title} style={S.row}>
              <Cover song={s} size={47} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={S.rowTitle}>{s.title}</div>
                <div style={S.rowArtist}>{s.artist}</div>
              </div>
              <Svg size={22} stroke="none" fill={MUTED}>
                <circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" />
              </Svg>
            </div>
          ))}
        </div>
      </div>

      {/* มินิเพลเยอร์ + แถบเมนูล่าง ลอยทับรายการ */}
      <div style={S.bottom}>
        <div style={S.mini}>
          <Cover song={NOW} size={38} radius={4} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{NOW.title}</div>
            <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.3 }}>{NOW.artist}</div>
          </div>
          <Svg size={22} stroke="none"><circle cx="12" cy="12" r="10" fill={GREEN} /><path d="M7.5 12.5l3 3 6-6.5" stroke="#000" strokeWidth="2" /></Svg>
          <Svg size={22} stroke="#fff" fill="#fff" sw={1}><path d="M8 5.5v13l11-6.5z" /></Svg>
        </div>

        <div style={S.nav}>
          <div style={{ ...S.navItem, color: MUTED }}>
            <Svg size={22} stroke={MUTED}><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" /></Svg>
            <span>Home</span>
          </div>
          <div style={{ ...S.navItem, color: MUTED }}>
            <Svg size={22} stroke={MUTED}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L20 20" /></Svg>
            <span>Search</span>
          </div>
          <div style={{ ...S.navItem, color: '#fff', fontWeight: 700 }}>
            <Svg size={22}><path d="M5 4v16M10 4v16M14 5l5 15" /></Svg>
            <span>Your Library</span>
          </div>
          <div style={{ ...S.navItem, color: MUTED }}>
            <Svg size={22} stroke={MUTED}><path d="M12 4v16M4 12h16" /></Svg>
            <span>Create</span>
          </div>
        </div>
      </div>
    </div>
  );
}