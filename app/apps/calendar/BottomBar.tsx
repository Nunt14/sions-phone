import { AlertIcon, InboxIcon, pillBase } from './ui';

/** แถบลอยด้านล่าง: ปุ่ม Today (เลื่อนไปเดือนปัจจุบัน) + ไอคอนแจ้งเตือน/กล่องจดหมาย (แสดงเฉยๆ) */
export default function BottomBar({ onToday }: { onToday: () => void }) {
  return (
    <div style={{ position: 'absolute', left: 24, right: 24, bottom: 26, display: 'flex', justifyContent: 'space-between', zIndex: 5 }}>
      <button type="button" onClick={onToday} style={{ ...pillBase, padding: '0 15px', fontSize: 15 }}>
        Today
      </button>
      <div style={{ ...pillBase, padding: '0 14px', gap: 18 }}>
        <AlertIcon />
        <InboxIcon />
      </div>
    </div>
  );
}
