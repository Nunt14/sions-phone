import type { Chat } from './data';
import { Avatar, L } from './ui';

export default function HomeTab({ chats: allChats, onOpen }: { chats: Chat[]; onOpen: (id: number) => void }) {
  const chats = allChats.filter((c) => c.kind === 'friend');
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 110 }}>
      <h1 style={{ margin: '14px 16px 0', fontSize: 26, fontWeight: 800 }}>Home</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 16px' }}>
        <Avatar chat={{ name: 'jjune', avatar: '/c1.png' }} size={60} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>jjune</div>
          <div style={{ fontSize: 13, color: L.gray, marginTop: 2 }}>Set a status message</div>
        </div>
      </div>

      <div style={{ padding: '6px 16px', fontSize: 13, fontWeight: 600, color: L.gray, borderTop: `1px solid ${L.border}` }}>
        Friends {chats.length}
      </div>
      {chats.map((c) => (
        <button key={c.id} type="button" onClick={() => onOpen(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '9px 16px', textAlign: 'left' }}>
          <Avatar chat={c} size={42} />
          <span style={{ fontSize: 15, fontWeight: 600 }}>{c.name}</span>
        </button>
      ))}
    </div>
  );
}
