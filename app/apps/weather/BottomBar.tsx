import type { CSSProperties } from 'react';
import { ArrowIcon, ListIcon, MapIcon, W } from './ui';

const glass: CSSProperties = {
  background: 'rgba(255,255,255,0.2)',
  border: '1px solid rgba(255,255,255,0.15)',
  backdropFilter: 'blur(12px)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/** แถบลอยด้านล่าง: แผนที่ / ตำแหน่งปัจจุบัน / รายการเมือง (แสดงเฉยๆ) */
export default function BottomBar() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 120,
          pointerEvents: 'none',
          background: `linear-gradient(to bottom, rgba(141,179,214,0), ${W.bgBottom} 65%)`,
        }}
      />
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 26, display: 'flex', alignItems: 'center', gap: 12, zIndex: 5 }}>
        <button type="button" aria-label="แผนที่" style={{ ...glass, width: 46, height: 46, borderRadius: '50%' }}><MapIcon /></button>
        <div style={{ ...glass, flex: 1, height: 46, borderRadius: 23, gap: 8 }}>
          <ArrowIcon size={14} />
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />
        </div>
        <button type="button" aria-label="รายการเมือง" style={{ ...glass, width: 46, height: 46, borderRadius: '50%' }}><ListIcon /></button>
      </div>
    </>
  );
}
