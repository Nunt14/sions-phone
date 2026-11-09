'use client';
import { useEffect, useState } from 'react';
import type { Chat } from './data';
import { Avatar } from './ui';

/** แบนเนอร์แจ้งเตือนข้อความใหม่ เลื่อนลงมาจากด้านบน แล้วหายไปเองใน ~4.5 วินาที (กดเพื่อปิดได้) */
export default function Banner({ chat, text }: { chat: Chat; text: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 450);
    const t2 = setTimeout(() => setShow(false), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <button
      type="button"
      onClick={() => setShow(false)}
      style={{
        position: 'absolute',
        top: 46,
        left: 8,
        right: 8,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        borderRadius: 24,
        textAlign: 'left',
        background: 'rgba(255,255,255,0.93)',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        transition: 'transform .35s ease, opacity .35s ease',
        transform: show ? 'translateY(0)' : 'translateY(-150%)',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <Avatar chat={chat} size={44} />
        <span style={{ position: 'absolute', right: -4, bottom: -4, width: 20, height: 20, borderRadius: 6, background: '#06c755', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 6, fontWeight: 800 }}>
          LINE
        </span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{chat.name}</span>
          <span style={{ fontSize: 12, color: '#6b7280' }}>now</span>
        </div>
        <div style={{ fontSize: 14, color: '#222', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</div>
      </div>
    </button>
  );
}
