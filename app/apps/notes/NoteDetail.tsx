'use client';
import type { Note } from './data';
import { BackIcon, ChecklistIcon, ClipIcon, ComposeIcon, DotsIcon, ShareIcon, circleBtn, floatingBar, pill } from './ui';

export default function NoteDetail({ note, onBack }: { note: Note; onBack: () => void }) {
  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#fff', color: '#000' }}>
      {/* ปุ่มบนสุด: ย้อนกลับ + (แชร์ / ...) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px 0', flexShrink: 0 }}>
        <button type="button" onClick={onBack} aria-label="ย้อนกลับ" style={circleBtn}><BackIcon /></button>
        <div style={{ ...pill, gap: 16, padding: '0 14px' }}>
          <ShareIcon />
          <DotsIcon />
        </div>
      </div>

      {/* เนื้อหาโน้ต (อ่านอย่างเดียว) */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', scrollbarWidth: 'none', padding: '40px 24px 120px' }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{note.title}</h1>
        <div style={{ marginTop: 18, whiteSpace: 'pre-wrap', fontSize: 17, lineHeight: 1.75, color: '#222' }}>{note.body}</div>
      </div>

      {/* แถบเครื่องมือล่าง (แสดงเฉยๆ) */}
      <div style={{ ...floatingBar, justifyContent: 'space-between' }}>
        <div style={{ ...pill, gap: 18, padding: '0 18px' }}>
          <ChecklistIcon />
          <ClipIcon />
          <ComposeIcon />
        </div>
        <button type="button" aria-label="โน้ตใหม่" style={circleBtn}><ComposeIcon /></button>
      </div>
    </div>
  );
}
