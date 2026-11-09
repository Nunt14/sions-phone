'use client';
import { useState } from 'react';
import PhoneHeader from './PhoneHeader';
import { BackspaceIcon, HandsetIcon, P } from './ui';

const KEYS: [string, string][] = [
  ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
  ['*', ''], ['0', ''], ['#', ''],
];

export default function KeypadTab({ onCall }: { onCall: (number: string) => void }) {
  const [number, setNumber] = useState('');

  const press = (k: string) => setNumber((n) => (n.length < 15 ? n + k : n));
  const call = () => {
    if (!number) return;
    onCall(number);
    setNumber('');
  };

  return (
    <>
      <PhoneHeader title="Keypad" />

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, paddingBottom: 96 }}>
        {/* ช่องแสดงเบอร์ */}
        <div style={{ position: 'relative', width: '100%', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 32, fontWeight: 300, letterSpacing: 1 }}>{number}</span>
          {number && (
            <button type="button" aria-label="ลบ" onClick={() => setNumber((n) => n.slice(0, -1))} style={{ position: 'absolute', right: 40, color: P.gray }}>
              <BackspaceIcon />
            </button>
          )}
        </div>

        {/* ปุ่มตัวเลข */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 70px)', columnGap: 8, rowGap: 12, marginTop: 12 }}>
          {KEYS.map(([k, sub]) => (
            <button
              key={k}
              type="button"
              onClick={() => press(k)}
              style={{ width: 70, height: 70, borderRadius: '50%', background: P.key, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ fontSize: 30, fontWeight: 300, lineHeight: 1 }}>{k}</span>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, height: 11, marginTop: 1 }}>{sub}</span>
            </button>
          ))}
        </div>

        {/* ปุ่มโทร */}
        <button
          type="button"
          aria-label="โทร"
          onClick={call}
          style={{ marginTop: 16, width: 64, height: 64, borderRadius: '50%', background: P.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: number ? 1 : 0.85 }}
        >
          <HandsetIcon size={30} />
        </button>
      </div>
    </>
  );
}
