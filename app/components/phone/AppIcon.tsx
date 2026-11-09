'use client';
import { useState, type ReactNode } from 'react';

interface Props {
  name: string;
  iconSrc?: string;
  fallback: ReactNode;
  size?: number;
  badge?: number;
}

/** ไอคอนทรงสี่เหลี่ยมมนแบบ iOS (squircle ≈ 22.5%) */
export default function AppIcon({ name, iconSrc, fallback, size = 58, badge }: Props) {
  const [err, setErr] = useState(false);
  const showImg = iconSrc && !err;

  return (
    <div className="relative" style={{ width: size, height: size, position: 'relative' }}>
      <div className="w-full h-full rounded-[22.5%] overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-black/10 flex items-center justify-center">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/icons/${iconSrc}`} alt={name} draggable={false} className="w-full h-full object-cover" onError={() => setErr(true)} />
        ) : (
          fallback
        )}
      </div>
      {badge ? (
  <span
    style={{
      position: 'absolute',
      top: -6,
      right: -6,
      minWidth: 20,
      height: 20,
      padding: '0 6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 9999,
      background: '#ff3b30',
      color: '#fff',
      fontSize: 12,
      fontWeight: 600,
      boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
    }}
  >
    {badge}
  </span>
) : null}
    </div>
  );
}
