import { MenuIcon, softPill } from './ui';

/** แถบหัว: ปุ่ม Edit ซ้าย / ชื่อหน้ากลาง / ปุ่มเมนูกลมขวา (แสดงเฉยๆ) */
export default function PhoneHeader({ title }: { title: string }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px 0', flexShrink: 0 }}>
      <div style={{ ...softPill, height: 44, padding: '0 18px', borderRadius: 22, fontSize: 16 }}>Edit</div>
      <h1 style={{ position: 'absolute', left: 0, right: 0, top: 8, lineHeight: '44px', textAlign: 'center', fontSize: 17, fontWeight: 700, pointerEvents: 'none' }}>
        {title}
      </h1>
      <div style={{ ...softPill, width: 44, height: 44, borderRadius: '50%' }}><MenuIcon /></div>
    </div>
  );
}
