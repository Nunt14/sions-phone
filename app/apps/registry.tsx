import type { AppDefinition } from '../lib/types';
import CalendarIcon from './CalendarIcon';
import PhotosApp from './PhotosApp';
import CameraApp from './CameraApp';
import ClockApp from './ClockApp';
import NotesApp from './NotesApp';
import CalendarApp from './CalendarApp';
import WeatherApp from './WeatherApp';
import SettingsApp from './SettingsApp';
import InstagramApp from './InstagramApp';
import YouTubeApp from './YouTubeApp';
import PhoneApp from './PhoneApp';
import SafariApp from './SafariApp';
import LineApp from './LineApp';
import SpotifyApp from './SpotifyApp';

const center = 'w-full h-full flex items-center justify-center';

/**
 * ทะเบียนแอปทั้งหมด — เพิ่มแอปใหม่: สร้างไฟล์ในโฟลเดอร์นี้ → เพิ่ม 1 รายการด้านล่าง → ใส่ id ใน lib/layout.ts
 * ไอคอน: วางรูป PNG ที่ public/icons/<iconSrc> (ถ้าไม่มีไฟล์จะใช้ icon สำรองที่นี่)
 */
export const apps: AppDefinition[] = [
  {
    id: 'instagram', name: 'Instagram', iconSrc: 'instagram.png', component: InstagramApp,
    background: 'bg-black', statusBar: 'light',
    icon: <div className={`${center} bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 text-white text-2xl`}>📸</div>,
  },
  {
    id: 'photos', name: 'รูปภาพ', iconSrc: 'photos.png', component: PhotosApp,
    background: 'bg-black', statusBar: 'light',
    icon: <div className={`${center} bg-white text-2xl`}>🌸</div>,
  },
  {
    id: 'calendar', name: 'ปฏิทิน', component: CalendarApp,
    background: 'bg-white', statusBar: 'dark',
    icon: <CalendarIcon />,
  },
  {
    id: 'camera', name: 'กล้อง', iconSrc: 'camera.png', component: CameraApp,
    background: 'bg-black', statusBar: 'light',
    icon: <div className={`${center} bg-zinc-700 text-2xl`}>📷</div>,
  },
  {
    id: 'clock', name: 'นาฬิกา', iconSrc: 'clock.png', component: ClockApp,
    background: 'bg-black', statusBar: 'light',
    icon: <div className={`${center} bg-black text-white text-2xl`}>🕐</div>,
  },
  {
    id: 'notes', name: 'โน้ต', iconSrc: 'notes.png', component: NotesApp,
    background: '#f2f2f7', statusBar: 'dark',
    icon: <div className={`${center} bg-amber-100 flex-col justify-start`}><div className="w-full h-3 bg-amber-400" /></div>,
  },
  {
    id: 'weather', name: 'สภาพอากาศ', iconSrc: 'weather.png', component: WeatherApp,
    background: 'linear-gradient(180deg, #2f78b6 0%, #3f87c5 35%, #8fb6da 100%)', statusBar: 'light',
    icon: <div className={`${center} bg-sky-500 text-2xl`}>🌤️</div>,
  },
  {
    id: 'settings', name: 'การตั้งค่า', iconSrc: 'settings.png', component: SettingsApp,
    background: 'bg-[#f2f2f7]', statusBar: 'dark',
    icon: <div className={`${center} bg-zinc-500 text-2xl`}>⚙️</div>,
  },
  {
    id: 'youtube', name: 'YouTube', iconSrc: 'youtube.png', component: YouTubeApp,
    url: 'https://youtu.be/RHnPq3Z0A8c?si=8naJof2y425bakO4', 
    background: 'bg-[#0f0f0f]', statusBar: 'light',
    icon: <div className={`${center} bg-white`}><div className="w-8 h-6 bg-red-600 rounded-lg text-white text-[10px] flex items-center justify-center">▶</div></div>,
  },
  {
    id: 'phone', name: 'โทรศัพท์', iconSrc: 'phone.png', component: PhoneApp,
    background: 'bg-white', statusBar: 'dark',
    icon: <div className={`${center} bg-emerald-500 text-white text-2xl`}>📞</div>,
  },
  {
    id: 'safari', name: 'Safari', iconSrc: 'safari.png', component: SafariApp,
  background: '#f4f4f6', statusBar: 'dark',
    icon: <div className={`${center} bg-white text-2xl`}>🧭</div>,
  },
  {
    id: 'line', name: 'LINE', iconSrc: 'line.png', badge: 2, component: LineApp,
    background: 'bg-white', statusBar: 'dark',
    icon: <div className={`${center} bg-[#06c755] text-white font-bold text-xs`}>LINE</div>,
  },
  {
    id: 'spotify', name: 'Spotify', iconSrc: 'spotify.png', component: SpotifyApp,
       background: '#4160fa', statusBar: 'light',
    icon: <div className={`${center} bg-black text-[#1db954] text-2xl`}>●</div>,
  },
];

export const getApp = (id: string) => apps.find((a) => a.id === id);
