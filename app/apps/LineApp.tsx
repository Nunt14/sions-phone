'use client';
import { useState } from 'react';
import ChatsTab from './line/ChatsTab';
import HomeTab from './line/HomeTab';
import SettingsTab from './line/SettingsTab';
import LineTabBar, { type LineTab } from './line/LineTabBar';
import ChatRoom from './line/ChatRoom';
import { INITIAL_CHATS, type Chat } from './line/data';

export default function LineApp() {
  const [tab, setTab] = useState<LineTab>('chats');
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [openId, setOpenId] = useState<number | null>(null);

  const open = (id: number) => {
    setChats((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
    setOpenId(id);
  };

  // ส่งข้อความ: เพิ่มเข้าห้องแชท แล้วดันห้องนั้นขึ้นบนสุดของรายการ
  const send = (id: number, text: string) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    setChats((cs) => {
      const target = cs.find((c) => c.id === id);
      if (!target) return cs;
      const hasToday = target.items.some((it) => it.type === 'date' && it.label === 'Today');
      const items = [
        ...target.items,
        ...(hasToday ? [] : [{ type: 'date' as const, label: 'Today' }]),
        { type: 'msg' as const, from: 'me' as const, text, time },
      ];
      return [{ ...target, items, time }, ...cs.filter((c) => c.id !== id)];
    });
  };

  const current = chats.find((c) => c.id === openId) ?? null;

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#fff', color: '#111' }}>
      <style>{`.line-input::placeholder{color:#9ca3af;opacity:1}`}</style>

      {tab === 'chats' && <ChatsTab chats={chats} onOpen={open} />}
      {tab === 'home' && <HomeTab chats={chats} onOpen={open} />}
      {tab === 'settings' && <SettingsTab />}

      <LineTabBar tab={tab} onChange={setTab} />

      {current && <ChatRoom key={current.id} chat={current} onBack={() => setOpenId(null)} onSend={(t) => send(current.id, t)} />}
    </div>
  );
}
