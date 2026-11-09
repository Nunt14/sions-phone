'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';

const POSTS = [
  {
    user: 'jjune',
    userImg: '/p13.jpg',
    img: '/p2.jpg',
    likes: '360',
    comments: '5',
    shares: '83',
    sends: '174',
    caption: ' ตรงรุ่น ไม่วุ่นวาย',
    subCaption: 'meenie  ได้ครับพี่ ดีครับนาย สบายครับท่าน',
  },
  {
    user: 'v.weerawan',
    userImg: '/p4.jpg',
    img: '/p3.jpg',
    likes: '12.4K',
    comments: '142',
    shares: '25',
    sends: '310',
    caption: '  เสร็จงานแล้วสักที',
    subCaption: 'jjune  เธอ พี่ยอมแล้ว กลับบ้านเรานะ 😭😭',
  },
  {
    user: 'jayj',
    userImg: '/p6.jpg',
    img: '/p7.jpg',
    likes: '210',
    comments: '6',
    shares: '1',
    sends: '2',
    caption: '  อ้วงงงงงงงงงงงง',
    subCaption: 'jjune  น้องนุ่งมันเคยซื้อให้กินไหมน้อ',
  },
  {
    user: 'jenet',
    userImg: '/p9.jpg',
    img: '/p8.jpg',
    likes: '256',
    comments: '10',
    shares: '3',
    sends: '',
    caption: '  เด็กดื้อ 🤍',
    subCaption: 'jayj  อ่อจร้าาา',
  },
  {
    user: 'v.weerawan',
    userImg: '/p4.jpg',
    img: '/p10.jpg',
    likes: '22.4K',
    comments: '142',
    shares: '25',
    sends: '310',
    caption: '  Pre-Wedding 🤍',
    subCaption: 'jjune  always love you bb',
  },
  {
    user: 'meenie',
    userImg: '/p12.jpg',
    img: '/p11.jpg',
    likes: '350',
    comments: '12',
    shares: '6',
    sends: '2',
    caption: '  พี่แพทพาอ้วนอะ',
    subCaption: 'jjune  พวกข้าวใหม่ปลามันเนาะ (พี่แพทหนีไป)',
  },
];

type ChatMessage = {
  from: 'me' | 'them';
  text: string;
  separator?: string; // วันที่/เวลาที่คั่นอยู่เหนือข้อความนี้
  storyReply?: boolean; // แสดง "You replied to their story / Story unavailable" เหนือข้อความนี้
  repliedStory?: { img: string; user: string };
};

type Chat = {
  name: string;
  userImg: string;
  displayName: string;
  preview: string;
  timestamp: string;
  messages: ChatMessage[];
};

const CHATS: Chat[] = [
  {
    name: 'meenie',
    userImg: '/p12.jpg',
    displayName: 'Meenie',
    preview: 'ได้ครับพี่ ดีครับนาย',
    timestamp: 'MAY 7 AT 14:19',
    messages: [
      {
        from: 'me',
        text: 'อ่อจร้า เปิดตัวแร้วว',
        storyReply: true,
      },
      { from: 'them', text: 'รอรัย แฟนกุน่ารักขนาดนี้' },
      { from: 'me', text: 'อรืมนะ' },
      { from: 'them', text: 'บริการดี กาแฟฟรีทุกวัน' },
      { from: 'me', text: 'ขอให้ฟันเหลืองค่ะ' },
      { from: 'them', text: 'ได้ข่าวว่าเหลืองก่อนกุอีก' },
      { from: 'me', text: 'กูจะฟ้องพี่แพท ควย' },

      { from: 'me', text: 'พี่แพทอยู่ร้านปะ', separator: 'JUN 8, AT 12:46' },
      { from: 'them', text: 'อยู่ค่าเสี่ย' },
      { from: 'me', text: 'เมกาโน่แก้ว' },
      { from: 'them', text: 'เคจ้า เข้ามากี่' },
      { from: 'me', text: 'อีก 15 นาที' },
      { from: 'me', text: 'วีเอาชาไทย หวานน้อย' },
    ],
  },
  {
    name: 'jayj',
    userImg: '/p6.jpg',
    displayName: 'JayJ',
    preview: 'น้องนุ่งมันเคยซื้อให้กินไหมน้อ',
    timestamp: 'JUN 12, 2026 AT 18:20',
    messages: [
      { from: 'them', text: 'วันนี้พาม๊าไปไหนกันดี' },
      { from: 'me', text: 'หาอะไรกินกันไหม จูนหิวอะ' },
      { from: 'them', text: 'เอาสิ เจอกันเย็นนี้' },
      { from: 'me', text: 'พี่เจนไปมะ' },
      { from: 'them', text: 'น่าจะ ไปถามแปป' },

      { from: 'me', text: 'เจ้ ง้อวียังไงดี', separator: 'JUN 10, AT 12:46' },
      { from: 'them', text: '...' },
      { from: 'them', text: 'ไปทำอะไรไว้ก่อน' },
      { from: 'me', text: 'จูนไม่ได้ทำ y-y' },
      { from: 'me', text: 'วีเข้าห้องทำงานมาตอนมีพนักงานคนนั้นอยู่' },
      { from: 'them', text: 'บัดสี ตัวใครตัวมันเถอะท่าน' },
      { from: 'me', text: 'เห้ย ไรวะ' },
      { from: 'me', text: 'ทำไมไม่ช่วยจูนเลย' },

      { from: 'them', text: 'ทำงานเสร็จยัง', separator: 'JUN 23, AT 15:46' },
      { from: 'me', text: 'เลิก 6 โมงนะวันนี้' },
      { from: 'me', text: 'ไม ไปไหนอะ' },
      { from: 'them', text: 'กลับบ้านหน่อยม๊ามึงคิดถึง' },
      { from: 'me', text: 'ตกใจ นึกว่ามีอะไร' },
      { from: 'me', text: 'เค เจอะเจอนะ เอาไรมะ ก่อนเข้าบ้าน' },
      { from: 'them', text: 'น้ำผลไม้สักสองกล่อง' },
      { from: 'me', text: 'เคค่า' },
    ],
  },
  {
    name: 'v.weerawan',
    userImg: '/p4.jpg',
    displayName: 'V. Weerawan',
    preview: 'เสร็จงานแล้วสักที',
    timestamp: 'JUN 8, 2023 AT 20:15',
    messages: [
      { from: 'them', text: 'สวัสดีค่ะ' },
      { from: 'them', text: 'เหมือนลูกค้าจะลืมของไว้' },
      { from: 'them', text: 'ใช่ของลูกค้าไหมคะ' },
      { from: 'me', text: 'เอ่อ เหมือนจะใช่ค่ะ' },
      { from: 'me', text: 'พรุ่งนี้เข้าไปเอาที่ร้านได้ไหมคะ' },
      { from: 'them', text: 'ได้ค่ะ' },
      { from: 'me', text: 'ขอบคุณนะคะ' },
      { from: 'them', text: 'ยินดีค่ะ' },

      {
        from: 'me',
        text: 'คุณหนู สวยจังเลย' ,
        storyReply: true,
        separator: 'OCT 18, AT 18:46'
      },
      { from: 'them', text: 'ชมแบบนี้ อยากได้อะไรคะ' },
      { from: 'them', text: 'บ้าน? ที่ดิน?' },
      { from: 'me', text: 'เธอใจเย็นๆ ค่ะ' },
      { from: 'me', text: 'เอาแค่เธอมาก็พอ' },
      { from: 'them', text: 'ทะลึ่ง' },
      { from: 'them', text: 'นิสัย วีทำงานอยู่นะ' },
      { from: 'me', text: 'แง' },
      { from: 'me', text: 'รีบกลับนะ จูนคิดถึง' },
    ],
  },
  {
    name: 'jenet',
    userImg: '/p9.jpg',
    displayName: 'Jenet',
    preview: 'เด็กดื้อ 🤍',
    timestamp: 'JUN 22, 2023 AT 19:30',
    messages: [
      {
        from: 'me',
        text: 'ร้านไหน จะพาวีไปกินบ้าง' ,
        storyReply: true,
      },

      { from: 'them', text: 'แถวสุขุมวิท' },
      { from: 'them', text: 'อิดฉาปะ' },
      { from: 'me', text: 'ไม่หรอกจ้า' },
      { from: 'them', text: 'ทำแต่งาน ไม่ได้เจอแฟน ว้ายๆ' },
      { from: 'me', text: '...' },
      { from: 'me', text: 'เดะลาออกโชว์แม่ม' },
    ],
  },
    {
    name: 's.jirawattada',
    userImg: '/p14.jpg',
    displayName: 'Sanit Jirawattada',
    preview: 'ตลอด',
    timestamp: 'JUN 12 AT 17:18',
    messages: [
      {
        from: 'them',
        text: 'วันนี้พี่จูนหล่อจัง',
        repliedStory: { img: '/p15.jpg', user: 'jjune' },
      },
      { from: 'them', text: 'พี่จูนว่างเช็คเอกสารให้หนูไหมคะ', separator: 'JUN 24, AT 14:10' },
      { from: 'me', text: 'ทิ้งไว้ให้เลขาพี่เลยค่ะ' },
      { from: 'them', text: 'แต่พี่นพเร่งเอานะคะ รบกวนเวลาพี่จูนแปปนึงได้ไหมคะ' },
      { from: 'me', text: 'โอเคค่ะ เข้ามาได้เลย' }, 
      { from: 'them', text: 'เย้ พี่จูนใจดีจัง' },
      { from: 'them', text: 'พี่จูนไปทานข้าวด้วยกันไหมคะ', separator: 'JUN 26, AT 15:10' },
      { from: 'me', text: 'ไม่เป็นค่ะ พี่งานเยอะ' }, 
      { from: 'them', text: 'ให้ดี้ซื้ออะไรไปให้ไหม' },
      { from: 'me', text: 'ไม่เป็นค่ะ ขอบคุณนะคะน้องดี้' }, 

      {
        from: 'them',
        text: 'กาแฟร้านไหนคะเนี่ย พาดี้ไปทานบ้างได้ไหม',
        repliedStory: { img: '/p16.jpg', user: 'jjune' },
        separator: 'JUN 30, AT 11:10'
      },
      { from: 'me', text: 'ร้านแฟนพี่ค่ะ' }, 

    ],
  },
];

/* ---------- สี/สไตล์ของหน้า DM และห้องแชท (ใช้ inline style เพื่อให้ติดแน่นอน) ---------- */
const C = {
  muted: '#9ca3af',
  dim: '#71717a',
  violet: '#6C3BEB', // ข้อความของเรา
  violetText: '#a89cff',
  field: '#22252d', // ช่องค้นหา / ช่องพิมพ์
  them: '#252730', // ข้อความอีกฝ่าย
  button: '#272a33',
  navBg: 'rgba(27,30,38,0.96)',
  line: 'rgba(255,255,255,0.15)',
};

const circleImg = (size: number): CSSProperties => ({
  width: size,
  height: size,
  minWidth: size,
  maxWidth: size,
  flex: `0 0 ${size}px`,
  objectFit: 'cover',
  borderRadius: '9999px',
});

const bubbleStyle = (from: ChatMessage['from']): CSSProperties => ({
  maxWidth: '75%',
  padding: '8px 14px',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.35,
  color: '#fff',
  wordBreak: 'break-word',
  background: from === 'me' ? C.violet : C.them,
  borderRadius: 20,
  ...(from === 'me' ? { borderBottomRightRadius: 6 } : { borderBottomLeftRadius: 6 }),
});

const navBtn = (active: boolean): CSSProperties => ({
  position: 'relative',
  width: 46,
  height: 46,
  borderRadius: '9999px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  background: active ? 'rgba(255,255,255,0.16)' : 'transparent',
});

type IconName =
  | 'heart'
  | 'comment'
  | 'repost'
  | 'send'
  | 'bookmark'
  | 'home'
  | 'reels'
  | 'search'
  | 'compose'
  | 'chevron'
  | 'back'
  | 'forward';

function Icon({
  name,
  size = 23,
  filled = false,
}: {
  name: IconName;
  size?: number;
  filled?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'heart' && (
        <path
          d="M20.8 8.8c0 4.2-8.8 10-8.8 10s-8.8-5.8-8.8-10a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z"
          fill={filled ? 'currentColor' : 'none'}
        />
      )}

      {name === 'comment' && (
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.1a8.5 8.5 0 1 1 16.3-4.4Z" />
      )}

      {name === 'repost' && (
        <>
          <path d="M17 2.8 21 6l-4 3.2" />
          <path d="M3 10V8a2 2 0 0 1 2-2h16" />
          <path d="m7 21-4-3.2L7 14.6" />
          <path d="M21 14v2a2 2 0 0 1-2 2H3" />
        </>
      )}

      {name === 'send' && (
        <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />
      )}

      {name === 'bookmark' && (
        <path d="M6 3.5h12v18l-6-4-6 4v-18Z" />
      )}

      {name === 'home' && (
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z" />
      )}

      {name === 'reels' && (
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
          <path d="m10 8 6 4-6 4V8Z" />
          <path d="m4.5 8 5-4M12 8l5-4" />
        </>
      )}

      {name === 'search' && (
        <>
          <circle cx="10.8" cy="10.8" r="7.3" />
          <path d="m16.2 16.2 4.3 4.3" />
        </>
      )}

      {name === 'compose' && (
        <>
          <path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
          <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
        </>
      )}

      {name === 'chevron' && <path d="m6 9 6 6 6-6" />}
      {name === 'back' && <path d="m15 5-7 7 7 7" />}
      {name === 'forward' && <path d="m9 5 7 7-7 7" />}
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 16.5v3a1.5 1.5 0 0 1-1.7 1.5A18.8 18.8 0 0 1 11.1 18a18.5 18.5 0 0 1-5.7-5.7 18.8 18.8 0 0 1-3-8.2A1.5 1.5 0 0 1 3.9 2.5h3a1.5 1.5 0 0 1 1.5 1.3c.1 1 .4 1.9.7 2.8a1.5 1.5 0 0 1-.3 1.6L7.5 9.5a15 15 0 0 0 7 7l1.3-1.3a1.5 1.5 0 0 1 1.6-.3c.9.3 1.8.6 2.8.7a1.5 1.5 0 0 1 .8.9Z" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3" />
    </svg>
  );
}

export default function InstagramApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageDraft, setMessageDraft] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[][]>(
    CHATS.map((chat) => chat.messages)
  );
  const mainRef = useRef<HTMLElement>(null);

  // เปิดห้องแชทหรือส่งข้อความใหม่ -> เลื่อนลงล่างสุด (เห็นข้อความล่าสุดเหมือนแอปจริง)
  useEffect(() => {
    if (selectedChat !== null && mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
  }, [selectedChat, chatMessages]);

  const toggleLike = (index: number) => {
    setLikedPosts((current) => ({
      ...current,
      [index]: !current[index],
    }));
  };

  const openMessages = () => {
    setActiveTab('dm');
    setSelectedChat(null);
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = messageDraft.trim();

    if (!message || selectedChat === null) {
      return;
    }

    const newMessage: ChatMessage = { from: 'me', text: message };

    setChatMessages((current) =>
      current.map((messages, index) =>
        index === selectedChat ? [...messages, newMessage] : messages
      )
    );

    setMessageDraft('');
  };

  const row: CSSProperties = { display: 'flex', alignItems: 'center' };

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-black text-white">
      <style>{`.ig-input::placeholder{color:${C.muted};opacity:1}`}</style>

      {/* Header */}
      {activeTab === 'dm' ? (
        selectedChat === null ? (
          <header
            style={{ ...row, position: 'relative', justifyContent: 'center', height: 50, flexShrink: 0, padding: '0 16px' }}
          >
            <div style={{ ...row, gap: 4, fontSize: 18, fontWeight: 700 }}>
              jjune <Icon name="chevron" size={15} />
            </div>

            <button
              type="button"
              aria-label="เขียนข้อความใหม่"
              style={{ position: 'absolute', right: 16, color: '#fff' }}
            >
              <Icon name="compose" size={22} />
            </button>
          </header>
        ) : (
          <header
            style={{ ...row, justifyContent: 'space-between', height: 50, flexShrink: 0, padding: '0 14px' }}
          >
            <div style={{ ...row, gap: 10, minWidth: 0 }}>
              <button
                type="button"
                aria-label="กลับไปรายชื่อข้อความ"
                onClick={() => setSelectedChat(null)}
                style={{ color: '#fff' }}
              >
                <Icon name="back" size={22} />
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CHATS[selectedChat].userImg} alt="" style={circleImg(30)} />

              <div style={{ ...row, gap: 4, minWidth: 0, fontSize: 12.5, fontWeight: 600 }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {CHATS[selectedChat].name}
                </span>
                <Icon name="forward" size={11} />
              </div>
            </div>

            <div style={{ ...row, gap: 16, flexShrink: 0 }}>
              <button type="button" aria-label="โทร">
                <PhoneIcon />
              </button>
              <button type="button" aria-label="วิดีโอ">
                <VideoIcon />
              </button>
            </div>
          </header>
        )
      ) : (
        <header className="flex h-[62px] shrink-0 items-center justify-between border-b border-white/10 px-4">
          <span className="font-serif text-[28px] font-bold italic leading-none tracking-[-2px]">
            Instagram
          </span>

          <button
            type="button"
            aria-label="ส่งข้อความ"
            onClick={openMessages}
            className="shrink-0 transition-transform active:scale-90"
          >
            <Icon name="send" size={27} />
          </button>
        </header>
      )}

      {/* Main content */}
      <main
        ref={mainRef}
        className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {activeTab === 'dm' ? (
          selectedChat === null ? (
            /* ---------- รายการแชท ---------- */
            <div style={{ padding: '6px 16px 16px' }}>
              {/* Search */}
              <div
                style={{
                  ...row,
                  gap: 10,
                  height: 40,
                  padding: '0 12px',
                  borderRadius: 14,
                  background: C.field,
                  color: C.muted,
                  fontSize: 14,
                }}
              >
                <Icon name="search" size={18} />
                <span>Search</span>
              </div>

              {/* Messages heading */}
              <div style={{ ...row, justifyContent: 'space-between', margin: '18px 0 6px' }}>
                <h2 style={{ fontSize: 15, fontWeight: 700 }}>Messages</h2>
                <button type="button" style={{ fontSize: 12.5, color: C.violetText }}>
                  Requests (3)
                </button>
              </div>

              {/* Chat list */}
              {CHATS.map((chat, index) => {
                const messages = chatMessages[index];
                const latestMessage = messages[messages.length - 1]?.text ?? chat.preview;

                return (
                  <button
                    key={chat.name}
                    type="button"
                    onClick={() => setSelectedChat(index)}
                    style={{ ...row, gap: 12, width: '100%', padding: '8px 0', textAlign: 'left' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={chat.userImg} alt="" style={circleImg(56)} />

                    <span style={{ minWidth: 0, flex: 1, textAlign: 'left' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 13.5,
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {chat.name}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          marginTop: 2,
                          fontSize: 11.5,
                          color: C.muted,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {latestMessage}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            /* ---------- ห้องแชท ---------- */
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', padding: '0 14px 8px' }}>
              {/* Profile information */}
              <section
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingTop: 16,
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CHATS[selectedChat].userImg}
                  alt={CHATS[selectedChat].name}
                  style={circleImg(84)}
                />

                <h2 style={{ marginTop: 10, fontSize: 14, fontWeight: 700 }}>
                  {CHATS[selectedChat].displayName}
                </h2>

                <p style={{ marginTop: 2, fontSize: 12, color: C.muted }}>
                  {CHATS[selectedChat].name} · Instagram
                </p>

                <p style={{ marginTop: 2, fontSize: 12, color: C.muted }}>
                  You follow each other on Instagram
                </p>

                <p style={{ marginTop: 2, fontSize: 12, color: C.muted }}>
                  Following each other since June 8, 2023
                </p>

                <button
                  type="button"
                  style={{
                    marginTop: 14,
                    padding: '6px 18px',
                    borderRadius: 10,
                    background: C.button,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  View profile
                </button>
              </section>

              {/* Date separator */}
              <div style={{ padding: '30px 0 14px', textAlign: 'center', fontSize: 11, color: C.dim }}>
                {CHATS[selectedChat].timestamp}
              </div>

              {/* Chat messages */}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {chatMessages[selectedChat].map((message, index) => (
                  <Fragment key={`${selectedChat}-${index}`}>
                    {message.separator && (
                      <div style={{ padding: '18px 0 8px', textAlign: 'center', fontSize: 11, color: C.dim }}>
                        {message.separator}
                      </div>
                    )}

                    {message.storyReply && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: 8,
                          marginTop: 4,
                          fontSize: 12,
                          color: C.muted,
                        }}
                      >
                        <span>You replied to their story</span>
                        <span style={{ borderRight: '3px solid #3f3f46', paddingRight: 10 }}>
                          Story unavailable
                        </span>
                      </div>
                    )}

                    {message.repliedStory && (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        marginLeft: 32,
        marginTop: 4,
        fontSize: 12,
        color: C.muted,
      }}
    >
      <span>Replied to your story</span>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderLeft: '2px solid #c4c4c8',
          paddingLeft: 10,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={message.repliedStory.img}
          alt=""
          style={{ width: 56, height: 78, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
        />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>
          {message.repliedStory.user}
        </span>
      </div>
    </div>
  )}

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 8,
                        justifyContent: message.from === 'me' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {message.from === 'them' && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={CHATS[selectedChat].userImg} alt="" style={circleImg(24)} />
                      )}

                      <div style={bubbleStyle(message.from)}>{message.text}</div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          )
        ) : (
          POSTS.map((post, index) => (
            <article
              key={`${post.user}-${index}`}
              className="border-b border-white/10 pb-3"
            >
              {/* Post header */}
              <div className="flex h-[54px] items-center justify-between px-4">
                <div className="flex min-w-0 items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.userImg}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full border border-zinc-700 object-cover"
                  />
                  <span className="truncate text-[14px] font-semibold">
                    {post.user}
                  </span>
                </div>

                <button
                  type="button"
                  aria-label="ตัวเลือกโพสต์"
                  className="shrink-0 px-1 text-xl font-bold tracking-[2px]"
                >
                  ···
                </button>
              </div>

              {/* Post image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.img}
                alt={post.caption}
                className="block aspect-square w-full object-cover"
              />

              {/* Actions */}
              <div className="flex items-center justify-between px-4 pb-1 pt-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => toggleLike(index)}
                    aria-label="ถูกใจ"
                    className={`flex shrink-0 items-center gap-1 text-[14px] font-semibold transition-transform active:scale-110 ${
                      likedPosts[index] ? 'text-red-500' : ''
                    }`}
                  >
                    <Icon
                      name="heart"
                      size={23}
                      filled={!!likedPosts[index]}
                    />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    type="button"
                    aria-label="แสดงความคิดเห็น"
                    className="flex shrink-0 items-center gap-1 text-[14px] font-semibold"
                  >
                    <Icon name="comment" size={22} />
                    <span>{post.comments}</span>
                  </button>

                  <button
                    type="button"
                    aria-label="รีโพสต์"
                    className="flex shrink-0 items-center gap-1 text-[14px] font-semibold"
                  >
                    <Icon name="repost" size={22} />
                    <span>{post.shares}</span>
                  </button>

                  <button
                    type="button"
                    aria-label="ส่งโพสต์"
                    className="flex shrink-0 items-center gap-1 text-[14px] font-semibold"
                  >
                    <Icon name="send" size={22} />
                    <span>{post.sends}</span>
                  </button>
                </div>

                <button
                  type="button"
                  aria-label="บันทึกโพสต์"
                  className="ml-2 shrink-0"
                >
                  <Icon name="bookmark" size={24} />
                </button>
              </div>

              {/* Captions */}
              <div className="space-y-0.5 px-4 text-[13px] leading-5">
                <p>
                  <strong className="mr-1.5 font-semibold">{post.user}</strong>
                  {post.caption}
                </p>

                {post.subCaption && (
                  <p>
                    <strong className="mr-1.5 font-semibold">
                      {post.subCaption.split(' ')[0]}
                    </strong>
                    {post.subCaption.split(' ').slice(1).join(' ')}
                  </p>
                )}
              </div>
            </article>
          ))
        )}
      </main>

      {/* Message composer */}
      {activeTab === 'dm' && selectedChat !== null && (
        <form onSubmit={sendMessage} style={{ flexShrink: 0, padding: '8px 12px 26px' }}>
          <div
            style={{
              ...row,
              height: 44,
              borderRadius: 9999,
              background: C.field,
              paddingRight: 14,
            }}
          >
            <button
              type="button"
              aria-label="กล้อง"
              style={{
                ...row,
                justifyContent: 'center',
                width: 38,
                height: 38,
                margin: 3,
                flexShrink: 0,
                borderRadius: '9999px',
                background: C.violet,
                color: '#fff',
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
            </button>

            <input
              value={messageDraft}
              onChange={(event) => setMessageDraft(event.target.value)}
              placeholder="Message..."
              className="ig-input"
              style={{
                flex: 1,
                minWidth: 0,
                height: '100%',
                padding: '0 10px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: 14,
              }}
            />

            {messageDraft.trim() !== '' ? (
              <button type="submit" aria-label="ส่งข้อความ" style={{ fontSize: 14, fontWeight: 600, color: C.violetText }}>
                Send
              </button>
            ) : (
              <div style={{ ...row, gap: 14, color: '#e4e4e7' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-label="บันทึกเสียง">
                  <rect x="9" y="3" width="6" height="12" rx="3" />
                  <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" />
                </svg>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-label="เลือกรูปภาพ">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="8.5" cy="9" r="1.5" />
                  <path d="m21 15-5-5L5 20" />
                </svg>
              </div>
            )}
          </div>
        </form>
      )}

      {/* Bottom navigation */}
      {!(activeTab === 'dm' && selectedChat !== null) && (
        <nav style={{ flexShrink: 0, padding: '8px 12px 24px', zIndex: 40 }}>
          <div
            style={{
              ...row,
              justifyContent: 'space-around',
              height: 58,
              maxWidth: 390,
              margin: '0 auto',
              padding: '0 6px',
              borderRadius: 9999,
              border: `1px solid ${C.line}`,
              background: C.navBg,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            <button type="button" aria-label="หน้าหลัก" onClick={() => setActiveTab('home')} style={navBtn(activeTab === 'home')}>
              <Icon name="home" size={26} />
            </button>

            <button type="button" aria-label="Reels" onClick={() => setActiveTab('reels')} style={navBtn(activeTab === 'reels')}>
              <Icon name="reels" size={26} />
            </button>

            <button type="button" aria-label="ข้อความ" onClick={openMessages} style={navBtn(activeTab === 'dm')}>
              <Icon name="send" size={27} />
              <span
                style={{ position: 'absolute', right: 10, bottom: 8, width: 8, height: 8, borderRadius: '9999px', background: '#ff3040' }}
              />
            </button>

            <button type="button" aria-label="ค้นหา" onClick={() => setActiveTab('search')} style={navBtn(activeTab === 'search')}>
              <Icon name="search" size={26} />
            </button>

            <button type="button" aria-label="โปรไฟล์" onClick={() => setActiveTab('profile')} style={navBtn(activeTab === 'profile')}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/p13.jpg" alt="โปรไฟล์" style={circleImg(30)} />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}