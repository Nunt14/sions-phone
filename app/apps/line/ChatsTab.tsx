'use client';
import { useState } from 'react';
import { lastText, type Chat } from './data';
import { Avatar, CalendarIcon, CaretDown, ImageIcon, L, PlusIcon, ScanIcon, SearchIcon, outline } from './ui';

const FILTERS = ['All', 'Friends', 'Groups'] as const;

export default function ChatsTab({ chats, onOpen }: { chats: Chat[]; onOpen: (id: number) => void }) {
  const [segment, setSegment] = useState<'chats' | 'friends'>('chats');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const shown = chats.filter(
    (c) =>
      (filter === 'All' || (filter === 'Friends' ? c.kind === 'friend' : c.kind === 'group')) &&
      (!q || c.name.toLowerCase().includes(q) || lastText(c).toLowerCase().includes(q))
  );

  const segBtn = (active: boolean) => ({
    height: 40,
    padding: '0 16px',
    borderRadius: 20,
    fontSize: 15,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: active ? '#111' : 'transparent',
    color: active ? '#fff' : '#111',
  });

  return (
    <>
      {/* แถวบน: สลับ Chats/Friends + ปุ่มไอคอน */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px 0', flexShrink: 0 }}>
        <div style={{ ...outline, display: 'flex', alignItems: 'center', padding: 3, borderRadius: 24, height: 48 }}>
          <button type="button" onClick={() => setSegment('chats')} style={segBtn(segment === 'chats')}>
            Chats {segment === 'chats' && <CaretDown />}
          </button>
          <button type="button" onClick={() => setSegment('friends')} style={segBtn(segment === 'friends')}>Friends</button>
        </div>
        <div style={{ ...outline, display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', borderRadius: 24, height: 48 }}>
          <ImageIcon /><CalendarIcon /><PlusIcon size={22} />
        </div>
      </div>

      {/* ช่องค้นหา */}
      <div style={{ margin: '16px 16px 0', height: 44, borderRadius: 22, background: L.chip, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', color: L.gray, flexShrink: 0 }}>
        <SearchIcon />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="line-input"
          style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: '#111' }}
        />
        <ScanIcon />
      </div>

      {segment === 'chats' && (
        <div style={{ display: 'flex', gap: 8, padding: '16px 16px 4px', flexShrink: 0 }}>
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                style={{ height: 35, padding: '0 17px', borderRadius: 18, fontSize: 14, fontWeight: 700, background: active ? '#111' : '#fff', color: active ? '#fff' : '#111', border: `1px solid ${active ? '#111' : L.border}` }}
              >
                {f}
              </button>
            );
          })}
        </div>
      )}

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 110 }}>
        {shown.length === 0 && <div style={{ textAlign: 'center', color: L.gray, fontSize: 14, marginTop: 40 }}>No chats</div>}

        {shown.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onOpen(c.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '12px 16px', textAlign: 'left' }}
          >
            <Avatar chat={c} size={54} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1b1b1b' }}>{c.name}</div>
              <div style={{ marginTop: 3, fontSize: 13.5, color: L.gray, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {lastText(c)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, alignSelf: 'stretch', justifyContent: 'center' }}>
              <span style={{ fontSize: 12, color: L.gray }}>{c.time}</span>
              {c.unread > 0 ? (
                <span style={{ minWidth: 20, height: 20, padding: '0 6px', borderRadius: 10, background: L.green, color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {c.unread}
                </span>
              ) : (
                <span style={{ height: 20 }} />
              )}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
