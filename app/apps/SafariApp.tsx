import type { CSSProperties, ReactNode } from 'react';

const HISTORY = [
  'ขอแต่งงานยังไงดี',
  'เมียโกด ง้อยังไง',
  'เรากวนตีน จริงหรอ?',
  'ชุดแต่งงานเริ่ดๆ ',
  'ร้านข้าวตอนกลางคืน ใกล้ฉัน',
];

const BLUE = '#007aff';
const INK = '#1c1c1e';
const GRAY = '#8e8e93';

// ใช้ inline style ทั้งหมด เพื่อไม่ให้โดนสี/CSS จาก shell มือถือทับ
const S: Record<string, CSSProperties> = {
  root: {
    flex: 1, minHeight: 0, width: '100%', display: 'flex', flexDirection: 'column',
    background: 'linear-gradient(180deg, #f4f4f6 0%, #e9e9ee 100%)',
    color: INK, position: 'relative', zIndex: 50,
  },
  body: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '58px 16px 0' },
  title: { fontSize: 23, fontWeight: 700, color: INK, margin: '0 0 14px 5px', letterSpacing: -0.3, lineHeight: 1.2, textShadow: 'none', opacity: 1 },
  card: { background: '#fff', borderRadius: 24, padding: '0 16px', margin: 0, listStyle: 'none' },
  row: { display: 'flex', alignItems: 'center', gap: 12, padding: '18px 0' },
  rowText: { fontSize: 14, lineHeight: '21px', color: INK, fontWeight: 400, textShadow: 'none', opacity: 1 },
  bar: {
    flexShrink: 0, padding: '8px 16px 30px', background: 'rgba(242,242,247,0.95)',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
  },
  url: {
    display: 'flex', alignItems: 'center', background: '#e3e3e8', borderRadius: 16,
    height: 42, padding: '0 14px',
  },
  urlText: { flex: 1, textAlign: 'center', fontSize: 15.5, fontWeight: 500, color: INK, textShadow: 'none' },
  tools: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, padding: '0 4px' },
};

const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const ClockIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={GRAY} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export default function SafariApp() {
  return (
    <div style={S.root}>
      <div style={S.body}>
        <h1 style={S.title}>Search History</h1>
        <ul style={S.card}>
          {HISTORY.map((q, i) => (
            <li key={q} style={{ ...S.row, borderTop: i ? '1px solid #e5e5ea' : 'none' }}>
              <ClockIcon />
              <span style={S.rowText}>{q}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={S.bar}>
        <div style={S.url}>
          <span style={{ color: GRAY, fontWeight: 600 }}>
            <span style={{ fontSize: 11 }}>A</span>
            <span style={{ fontSize: 16 }}>A</span>
          </span>
          <span style={S.urlText}>google.com</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GRAY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12a8 8 0 1 1-2.6-5.9" />
            <path d="M20 4v5h-5" />
          </svg>
        </div>

        <div style={S.tools}>
          <Icon><path d="M15 5l-7 7 7 7" /></Icon>
          <Icon><path d="M9 5l7 7-7 7" /></Icon>
          <Icon>
            <path d="M12 15V4M8.5 7.5L12 4l3.5 3.5" />
            <path d="M7 11H6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-1" />
          </Icon>
          <Icon>
            <path d="M12 7c-2-1.5-5-2-8-1.5v12c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-12C17 5 14 5.5 12 7z" />
            <path d="M12 7v12" />
          </Icon>
          <Icon>
            <rect x="8" y="8" width="12" height="12" rx="2.5" />
            <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
          </Icon>
        </div>
      </div>
    </div>
  );
}