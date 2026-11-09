import { YEAR } from './data';
import { ChevronLeft, ChevronRight, K, PlusIcon, pillBase } from './ui';

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

export default function TopBar({ onPrev, onNext }: Props) {
  const iconBtn = { width: 43, height: 43, display: 'flex', alignItems: 'center', justifyContent: 'center' } as const;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px 0', flexShrink: 0, background: K.bg }}>
      <div style={{ ...pillBase, padding: '0 14px 0 8px', gap: 2, fontSize: 15 }}>
        <ChevronLeft size={20} />
        {YEAR}
      </div>

      <div style={{ ...pillBase, padding: '0 4px' }}>
        <button type="button" aria-label="เดือนก่อนหน้า" onClick={onPrev} style={iconBtn}><ChevronLeft /></button>
        <button type="button" aria-label="เดือนถัดไป" onClick={onNext} style={iconBtn}><ChevronRight /></button>
        <button type="button" aria-label="เพิ่มนัดหมาย" style={iconBtn}><PlusIcon /></button>
      </div>
    </div>
  );
}
