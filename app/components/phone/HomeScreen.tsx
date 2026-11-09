'use client';
import StatusBar from './StatusBar';
import HomeIndicator from './HomeIndicator';
import AppTile from './AppTile';
import CalendarWidget from './CalendarWidget';
import { getApp } from '../../apps/registry';
import { DOCK_ITEMS, HOME_ITEMS } from '../../lib/layout';
import { HOME_WALLPAPER } from '../../lib/config';
import type { AppDefinition, Origin } from '../../lib/types';

interface Props {
  time: string;
  onOpenApp: (app: AppDefinition, origin: Origin) => void;
  onLock: () => void;
}

export default function HomeScreen({ time, onOpenApp, onLock }: Props) {
  return (
    <div className={`absolute inset-0 ${HOME_WALLPAPER} flex flex-col justify-between z-30 text-white`}>
      <div className="flex-1 flex flex-col pt-1">
        <StatusBar time={time} theme="light" />

        <div
  className="grid grid-cols-4 items-start px-3 pt-2"
  style={{ columnGap: 12, rowGap: 16 }}
>
          {HOME_ITEMS.map((id) => {
            if (id === 'widget:calendar') return <CalendarWidget key={id} />;
            const app = getApp(id);
            return app ? <AppTile key={id} app={app} onOpen={onOpenApp} /> : null;
          })}
        </div>
      </div>

      <div className="relative z-10 pb-5 flex flex-col gap-3">
        <div className="flex justify-center">
          <div className="w-[110px] h-[30px] bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center gap-1.5 border border-white/10 shadow-md text-white/80">
            <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[12px] tracking-tight">Search</span>
          </div>
        </div>

        <div className="flex justify-around items-center bg-white/20 backdrop-blur-[30px] mx-3 px-2 py-2.5 rounded-[32px] border border-white/25 shadow-xl">
          {DOCK_ITEMS.map((id) => {
            const app = getApp(id);
            return app ? <AppTile key={id} app={app} size={54} showLabel={false} onOpen={onOpenApp} /> : null;
          })}
        </div>
      </div>

      <HomeIndicator onClick={onLock} theme="light" />
    </div>
  );
}
