'use client';
import type { MouseEvent } from 'react';
import type { AppDefinition, Origin } from '../../lib/types';
import AppIcon from './AppIcon';

interface Props {
  app: AppDefinition;
  size?: number;
  showLabel?: boolean;
  onOpen: (app: AppDefinition, origin: Origin) => void;
}

/** ไอคอน + ชื่อ กดแล้วเปิดแอป (ส่งตำแหน่งไอคอนไปทำแอนิเมชันซูมแบบ iOS) */
export default function AppTile({ app, size = 58, showLabel = true, onOpen }: Props) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const frame = e.currentTarget.closest('[data-phone-frame]')?.getBoundingClientRect();
    const icon = e.currentTarget.getBoundingClientRect();
    onOpen(app, {
      x: frame ? icon.left + icon.width / 2 - frame.left : 170,
      y: frame ? icon.top + icon.height / 2 - frame.top : 350,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center gap-1 cursor-pointer transition active:scale-90 active:brightness-75"
    >
      <AppIcon name={app.name} iconSrc={app.iconSrc} fallback={app.icon} size={size} badge={app.badge} />
      {showLabel && <span className="text-[11px] font-medium text-white drop-shadow-md leading-tight">{app.name}</span>}
    </button>
  );
}
