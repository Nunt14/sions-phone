'use client';
import { Fragment } from 'react';
import { NOTE_SECTIONS, TOTAL_NOTES, type Note } from './data';
import { BackIcon, ComposeIcon, DotsIcon, N, SearchIcon, circleBtn, floatingBar, pill } from './ui';

export default function NoteList({ onOpen }: { onOpen: (note: Note) => void }) {
  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: N.listBg, color: '#000' }}>
      {/* ปุ่มบนสุด */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px 0', flexShrink: 0 }}>
        <button type="button" aria-label="ย้อนกลับ" style={circleBtn}><BackIcon /></button>
        <button type="button" aria-label="เพิ่มเติม" style={circleBtn}><DotsIcon /></button>
      </div>

      {/* เนื้อหาเลื่อนได้ */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 110 }}>
        <h1 style={{ margin: '16px 16px 0', fontSize: 36, fontWeight: 800, letterSpacing: -0.5 }}>Notes</h1>
        <p style={{ margin: '4px 16px 0', fontSize: 14, color: N.gray }}>{TOTAL_NOTES} Notes</p>

        {NOTE_SECTIONS.map((section) => (
          <div key={section.month} style={{ marginTop: 22 }}>
            <h2 style={{ margin: '0 16px 8px', fontSize: 19, fontWeight: 700 }}>{section.month}</h2>

            <div style={{ margin: '0 14px', background: '#fff', borderRadius: 22, overflow: 'hidden' }}>
              {section.notes.map((note, i) => (
                <Fragment key={note.id}>
                  {i > 0 && <div style={{ height: 1, background: N.line, margin: '0 20px 0 24px' }} />}
                  <button
                    type="button"
                    onClick={() => onOpen(note)}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 24px' }}
                  >
                    <div style={{ fontSize: 17, fontWeight: 600, color: '#000' }}>{note.title}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 2, fontSize: 12.5, color: N.gray }}>
                      <span style={{ flexShrink: 0 }}>{note.date}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{note.preview}</span>
                    </div>
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* เฟดด้านล่างให้แถบลอยอ่านง่าย */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 110,
          pointerEvents: 'none',
          background: `linear-gradient(to bottom, rgba(242,242,247,0), ${N.listBg} 60%)`,
        }}
      />

      {/* แถบ Search + ปุ่มเขียนโน้ต */}
      <div style={floatingBar}>
        <div style={{ ...pill, flex: 1, gap: 10, padding: '0 14px', color: N.gray, fontSize: 15 }}>
          <span style={{ color: '#000', display: 'flex' }}><SearchIcon /></span>
          Search
        </div>
        <button type="button" aria-label="โน้ตใหม่" style={circleBtn}><ComposeIcon /></button>
      </div>
    </div>
  );
}
