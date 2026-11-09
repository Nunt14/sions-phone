'use client';
import { Fragment, useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import StatusBar from '../../components/phone/StatusBar';
import { useRealTime } from '../../hooks/useRealTime';
import Banner from './Banner';
import { lastText, type Chat } from './data';
import { Avatar, BackIcon, L, MenuIcon, PhoneIcon, PlusIcon, SearchIcon, SendIcon } from './ui';

const tail = (side: 'left' | 'right', color: string): CSSProperties => ({
  position: 'absolute',
  top: 8,
  [side]: -6,
  width: 0,
  height: 0,
  borderTop: '6px solid transparent',
  borderBottom: '6px solid transparent',
  ...(side === 'left' ? { borderRight: `8px solid ${color}` } : { borderLeft: `8px solid ${color}` }),
});

const meta: CSSProperties = { fontSize: 10, lineHeight: 1.25, color: L.meta, flexShrink: 0, paddingBottom: 2 };

/** ห้องแชท: คลุมทั้งหน้าต่างแอป (รวมแถบสถานะ) เพื่อให้พื้นหลังสีฟ้าต่อเนื่องกับด้านบน */
export default function ChatRoom({ chat, onBack, onSend }: { chat: Chat; onBack: () => void; onSend: (text: string) => void }) {
  const { time } = useRealTime();
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat.items.length]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onSend(text);
    setDraft('');
  };

  return (
    <div style={{ position: 'absolute', top: -40, left: 0, right: 0, bottom: 0, zIndex: 200, background: L.wall, color: '#111', display: 'flex', flexDirection: 'column' }}>
      <StatusBar time={time} theme="dark" />

      {/* ส่วนหัวห้องแชท */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 46, padding: '0 14px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          <button type="button" onClick={onBack} aria-label="กลับ" style={{ display: 'flex' }}><BackIcon /></button>
          <span style={{ fontSize: 17, fontWeight: 700 }}>{chat.name}</span>
          {chat.members && <span style={{ fontSize: 15, color: L.meta }}>{chat.members.length + 1}</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <SearchIcon size={21} /><PhoneIcon /><MenuIcon />
        </div>
      </div>

      {/* ข้อความ */}
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', scrollbarWidth: 'none', padding: '8px 12px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {chat.items.map((it, i) => {
          if (it.type === 'date') {
            return (
              <div key={i} style={{ alignSelf: 'center', margin: '10px 0 2px', padding: '5px 16px', borderRadius: 16, background: 'rgba(70,96,155,0.35)', color: '#fff', fontSize: 12 }}>
                {it.label}
              </div>
            );
          }

          const prev = chat.items[i - 1];
          const first = !(prev && prev.type === 'msg' && prev.from === it.from && prev.sender === it.sender);
          const me = it.from === 'me';
          const color = me ? L.bubbleMe : '#fff';
          const member = it.sender ? chat.members?.find((mb) => mb.name === it.sender) : undefined;

          return (
            <Fragment key={i}>
              <div style={{ display: 'flex', alignItems: me || !first ? 'flex-end' : 'flex-start', gap: 6, justifyContent: me ? 'flex-end' : 'flex-start' }}>
                {!me && (first ? <Avatar chat={member ?? chat} size={36} /> : <span style={{ width: 36, flexShrink: 0 }} />)}

                {me && (
                  <div style={{ ...meta, textAlign: 'right', alignSelf: 'flex-end' }}>
                    {it.read && <div>Read</div>}
                    <div>{it.time}</div>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: me ? 'flex-end' : 'flex-start', maxWidth: '68%', marginLeft: me ? 0 : 4 }}>
                  {!me && first && it.sender && (
                    <span style={{ fontSize: 12, color: L.meta, margin: '0 0 3px 4px' }}>{it.sender}</span>
                  )}
                  <div style={{ position: 'relative', padding: '9px 14px', borderRadius: 20, background: color, fontSize: 16, lineHeight: 1.3, wordBreak: 'break-word' }}>
                    {first && <span style={tail(me ? 'right' : 'left', color)} />}
                    {it.text}
                  </div>
                </div>

                {!me && <div style={{ ...meta, alignSelf: 'flex-end' }}>{it.time}</div>}
              </div>
            </Fragment>
          );
        })}
      </div>

      {/* ช่องพิมพ์ข้อความ */}
      <form onSubmit={submit} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px 30px', background: '#fff', flexShrink: 0 }}>
        <button type="button" aria-label="แนบ" style={{ display: 'flex', color: '#111' }}><PlusIcon size={28} /></button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Enter a message"
          className="line-input"
          style={{ flex: 1, minWidth: 0, height: 42, padding: '0 16px', borderRadius: 21, background: '#f5f5f5', border: `1px solid ${L.border}`, outline: 'none', fontSize: 15, color: '#111' }}
        />
        <button type="submit" aria-label="ส่ง" style={{ display: 'flex', color: L.send }}><SendIcon /></button>
      </form>

      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 130, height: 5, borderRadius: 3, background: 'rgba(0,0,0,0.8)' }} />

      {chat.banner && <Banner chat={chat} text={lastText(chat)} />}
    </div>
  );
}
