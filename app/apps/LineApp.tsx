'use client';
import { useEffect, useRef, useState } from 'react';
import ChatsTab from './line/ChatsTab';
import HomeTab from './line/HomeTab';
import SettingsTab from './line/SettingsTab';
import LineTabBar, { type LineTab } from './line/LineTabBar';
import ChatRoom from './line/ChatRoom';
import { INITIAL_CHATS, type Chat, type ChatItem } from './line/data';

// แชทที่ข้อความ "Today" จะไม่ขึ้นทันที แต่ค่อย ๆ ขึ้นหลังผู้ใช้กดเข้าแชทใดแชทหนึ่งในนี้
// 1 = my ceo ♡, 2 = เฉพาะกิจ (ตรงกับ id ใน line/data.ts)
const TARGET_IDS = [2];
// ตำแหน่งแบนเนอร์แจ้งเตือน นับจากขอบบนของพื้นที่แอป (ปรับได้)
const BANNER_TOP = 8;

// 💬 ตอบกลับอัตโนมัติ: ผู้ใช้พิมพ์อะไรไป อีกฝ่ายจะตอบวนตามลิสต์นี้ แล้วจบที่ฝั่งเขาเสมอ
const AUTO_REPLY_ON = true;
const AUTO_REPLIES = [
  'พิมไรมามองไม่เห็นนะ',
  'จริง ไม่เห็นแชทเลย',
  'ลองอีกที',
  'อีกสักที',
  'อีกสักที จะเป็นไรไป',
  'อ๋อออออ',
  'ยัง ยังไม่เห็น555555',
  'ก็เหนื่อยยยยย (เสียงแพรขวัญ)',
];

const META = new Map(INITIAL_CHATS.map((c) => [c.id, c] as const));
const isMine = (it: ChatItem) => it.type === 'msg' && it.from === 'me';
// หน่วงตามความยาวข้อความ ให้ดูเหมือนกำลังพิมพ์
const delayFor = (it: ChatItem) => (it.type === 'msg' ? 1200 + Math.min(it.text.length, 60) * 35 : 0);

// ตัดข้อความหลังตัวคั่น "Today" ของแชทเป้าหมายออกไปเก็บเป็นคิว
function splitToday(all: Chat[]) {
  const pending: Record<number, ChatItem[]> = {};
  const chats = all.map((c) => {
    if (!TARGET_IDS.includes(c.id)) return c;
    const i = c.items.findIndex((it) => it.type === 'date' && it.label === 'Today');
    if (i < 0) return c;
    pending[c.id] = c.items.slice(i + 1);
    const before = c.items.slice(0, i);
    // เวลาในรายการแชทใช้ป้ายวันที่ก่อนหน้า (เช่น Yesterday) แทนเวลาของข้อความ Today
    const lastDate = [...before].reverse().find((it) => it.type === 'date');
    const time = lastDate && lastDate.type === 'date' ? lastDate.label : c.time;
    return { ...c, items: before, unread: 0, time };
  });
  return { chats, pending };
}

type Banner = { id: number; name: string; text: string; k: number };

export default function LineApp() {
  const [seed] = useState(() => splitToday(INITIAL_CHATS));
  const [tab, setTab] = useState<LineTab>('chats');
  const [chats, setChats] = useState<Chat[]>(seed.chats);
  const [openId, setOpenId] = useState<number | null>(null);
  const [banner, setBanner] = useState<Banner | null>(null);

  const pendingRef = useRef<Record<number, ChatItem[]>>(seed.pending);
  const startedRef = useRef(false);
  const openRef = useRef<number | null>(null); // แชทที่เปิดอยู่ตอนนี้ (timer อ่านได้ค่าล่าสุด)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const bannerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soundInRef = useRef<HTMLAudioElement | null>(null); // 🔔 เสียงข้อความเข้า (อีกฝ่าย) v1
  const soundOutRef = useRef<HTMLAudioElement | null>(null); // 🔔 เสียงข้อความฝั่งเรา v2
  const replyTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({}); // 💬 timer คำตอบอัตโนมัติของแต่ละแชท
  const replyIdx = useRef<Record<number, number>>({}); // 💬 ลำดับคำตอบที่วนอยู่ของแต่ละแชท
  const lastSender = useRef<Record<number, string>>({}); // 💬 คนล่าสุดที่ตอบ (กันซ้ำคนเดิมติดกันในกลุ่ม)

  useEffect(() => {
    // 🔔 โหลดเสียงตอน mount
    const a = new Audio('/v1.mp3');
    a.preload = 'auto';
    const b = new Audio('/v2.mp3');
    b.preload = 'auto';
    soundInRef.current = a;
    soundOutRef.current = b;
    return () => {
      timers.current.forEach(clearTimeout);
      Object.values(replyTimers.current).forEach(clearTimeout); // 💬
      if (bannerTimer.current) clearTimeout(bannerTimer.current);
      a.pause();
      b.pause();
      soundInRef.current = null;
      soundOutRef.current = null;
    };
  }, []);

  // 🔔 เล่นเสียง: 'in' = ข้อความจากอีกฝ่าย (v1), 'out' = ข้อความฝั่งเรา (v2)
  const playSound = (kind: 'in' | 'out') => {
    const a = kind === 'out' ? soundOutRef.current : soundInRef.current;
    if (!a) return;
    // ข้อความไม่ใช่ฝั่งเรา → ตัดเสียง v2 ที่ค้างอยู่ทันที
    if (kind === 'in') {
      const o = soundOutRef.current;
      if (o) {
        o.pause();
        o.currentTime = 0;
      }
    }
    a.currentTime = 0; // ถ้าข้อความมารัว ๆ ให้เริ่มเสียงใหม่ทุกครั้ง
    a.play().catch(() => {}); // กัน error กรณีเบราว์เซอร์ยังไม่อนุญาตเล่นเสียง
  };

  const showBanner = (b: Omit<Banner, 'k'>) => {
    setBanner({ ...b, k: Date.now() });
    if (bannerTimer.current) clearTimeout(bannerTimer.current);
    bannerTimer.current = setTimeout(() => setBanner(null), 3800);
  };

  // ส่งข้อความเข้าแชท
  // - ผู้ใช้อยู่ในแชทนั้น  → ข้อความเด้งขึ้นในห้อง
  // - ผู้ใช้ไม่ได้อยู่ในแชทนั้น → เด้งแจ้งเตือนด้านบนทันที + เพิ่มตัวเลขยังไม่อ่าน
  const deliver = (id: number, item: ChatItem) => {
    const inChat = openRef.current === id;
    const mine = isMine(item);
    setChats((cs) => {
      const t = cs.find((c) => c.id === id);
      if (!t) return cs;
      const hasToday = t.items.some((it) => it.type === 'date' && it.label === 'Today');
      const items: ChatItem[] = [...t.items, ...(hasToday ? [] : [{ type: 'date' as const, label: 'Today' }]), item];
      const time = item.type === 'msg' ? item.time : t.time;
      const unread = inChat || mine ? 0 : t.unread + 1;
      return [{ ...t, items, time, unread }, ...cs.filter((c) => c.id !== id)];
    });
    // 🔔 เสียงข้อความ: ฝั่งเรา = v2, อีกฝ่าย = v1
    if (item.type === 'msg') playSound(mine ? 'out' : 'in');
    if (!inChat && !mine && item.type === 'msg') {
      const meta = META.get(id);
      const text = meta?.kind === 'group' && item.sender ? `${item.sender}: ${item.text}` : item.text;
      showBanner({ id, name: meta?.name ?? '', text });
    }
  };

  // เล่นคิวของแต่ละแชททีละข้อความ
  // ข้อความฝั่งเรา (me) รอจนกว่าผู้ใช้จะอยู่ในแชทนั้นก่อนถึงจะเด้งขึ้น
  const run = (id: number) => {
    const step = () => {
      const q = pendingRef.current[id];
      if (!q || q.length === 0) return;
      const next = q[0];
      if (isMine(next) && openRef.current !== id) {
        timers.current.push(setTimeout(step, 500));
        return;
      }
      timers.current.push(
        setTimeout(() => {
          const q2 = pendingRef.current[id];
          if (!q2 || q2[0] !== next) return;
          if (isMine(next) && openRef.current !== id) {
            step();
            return;
          }
          q2.shift();
          deliver(id, next);
          step();
        }, delayFor(next)),
      );
    };
    step();
  };

  const open = (id: number) => {
    openRef.current = id;
    setBanner(null);
    setChats((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
    setOpenId(id);
    // กดเข้าแชทเป้าหมายครั้งแรก → เริ่มเล่นข้อความ Today ของทุกแชทเป้าหมายพร้อมกัน
    if (TARGET_IDS.includes(id) && !startedRef.current) {
      startedRef.current = true;
      TARGET_IDS.forEach(run);
    }
  };

  const close = () => {
    openRef.current = null;
    setOpenId(null);
  };

    // 💬 ตอบกลับอัตโนมัติ: ยกเลิกคำตอบที่รออยู่ แล้วนับใหม่ → พอผู้ใช้หยุดพิมพ์ ข้อความสุดท้ายจะเป็นของฝั่งเขาเสมอ
  const scheduleReply = (id: number) => {
    if (!AUTO_REPLY_ON) return;
    const old = replyTimers.current[id];
    if (old) clearTimeout(old);

    // ถ้าบทหลักใน data (แชทใน TARGET_IDS) ยังเล่นไม่จบ ไม่ตอบวนในทุกแชท
    const scriptDone = TARGET_IDS.every((tid) => !(pendingRef.current[tid]?.length));
    if (!scriptDone) return;

    replyTimers.current[id] = setTimeout(() => {
      const meta = META.get(id);
      const i = replyIdx.current[id] ?? 0;
      replyIdx.current[id] = (i + 1) % AUTO_REPLIES.length;

      // แชทกลุ่ม: สุ่มสมาชิกที่ตอบ (ไม่ซ้ำคนเดิมติดกัน)
      let sender: string | undefined;
      if (meta?.kind === 'group' && meta.members && meta.members.length > 0) {
        const pool = meta.members.filter((mb) => mb.name !== lastSender.current[id]);
        const list = pool.length > 0 ? pool : meta.members;
        sender = list[Math.floor(Math.random() * list.length)].name;
        lastSender.current[id] = sender;
      }

      const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      deliver(id, { type: 'msg', from: 'them', text: AUTO_REPLIES[i], time, sender });
    }, 1000 + Math.random() * 1200);
  };

  // ส่งข้อความ: เพิ่มเข้าห้องแชท แล้วดันห้องนั้นขึ้นบนสุดของรายการ
  const send = (id: number, text: string) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    playSound('out'); // 🔔 เสียงตอนเราพิมพ์ส่งเอง
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
    scheduleReply(id); // 💬 ให้อีกฝ่ายตอบกลับวนๆ
  };

  const current = chats.find((c) => c.id === openId) ?? null;

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#fff', color: '#111' }}>
      <style>{`
        .line-input::placeholder{color:#9ca3af;opacity:1}
        @keyframes lineBannerIn{from{transform:translateY(-130%);opacity:0}to{transform:translateY(0);opacity:1}}
      `}</style>

      {/* แบนเนอร์แจ้งเตือนด้านบน (กล่องสูง 0 เป็นจุดอ้างอิงตำแหน่ง ไม่กระทบเลย์เอาต์) */}
      <div style={{ position: 'relative', height: 0, flexShrink: 0, zIndex: 999 }}>
        {banner && (
          <div
            key={banner.k}
            onClick={() => open(banner.id)}
            style={{
              position: 'absolute', top: BANNER_TOP, left: 8, right: 8, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
              background: 'rgba(246,246,248,0.97)', borderRadius: 18,
              boxShadow: '0 6px 24px rgba(0,0,0,0.28)', animation: 'lineBannerIn .35s ease-out',
            }}
          >
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#06c755', color: '#fff', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              LINE
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#111', lineHeight: 1.3 }}>{banner.name}</div>
              <div style={{ fontSize: 12.5, color: '#444', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{banner.text}</div>
            </div>
            <div style={{ fontSize: 11, color: '#8e8e93', alignSelf: 'flex-start' }}>now</div>
          </div>
        )}
      </div>

      {tab === 'chats' && <ChatsTab chats={chats} onOpen={open} />}
      {tab === 'home' && <HomeTab chats={chats} onOpen={open} />}
      {tab === 'settings' && <SettingsTab />}

      <LineTabBar tab={tab} onChange={setTab} />

      {current && <ChatRoom key={current.id} chat={current} onBack={close} onSend={(t) => send(current.id, t)} />}
    </div>
  );
}