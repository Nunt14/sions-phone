import type { CSSProperties, ReactNode } from 'react';

// ค่าสี/สไตล์กลางของแอปนาฬิกา (ใช้ inline style เพื่อให้ติดแน่นอน)
export const C = {
  bg: '#000',
  card: '#1c1c1e',
  line: '#2c2c2e',
  gray: '#8e8e93',
  orange: '#ff9f0a',
  green: '#30d158',
  red: '#ff453a',
  knobOff: '#39393d',
};

export const row: CSSProperties = { display: 'flex', alignItems: 'center' };

export const pillButton: CSSProperties = {
  ...row,
  justifyContent: 'center',
  height: 38,
  padding: '0 16px',
  borderRadius: 9999,
  background: C.card,
  color: '#fff',
  fontSize: 16,
};

export const pad2 = (n: number) => String(n).padStart(2, '0');

/** ส่วนหัวของแต่ละแท็บ: ปุ่มมุมขวาบน (ถ้ามี) + ชื่อหน้าตัวใหญ่ */
export function ClockHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ ...row, justifyContent: 'flex-end', gap: 8, height: 38, margin: '6px 16px 0' }}>{children}</div>
      <h1 style={{ margin: '18px 16px 0', fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>{title}</h1>
    </div>
  );
}

export const scrollArea: CSSProperties = {
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  scrollbarWidth: 'none',
};
