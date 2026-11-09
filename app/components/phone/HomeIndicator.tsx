import type { StatusBarTheme } from '../../lib/types';

export default function HomeIndicator({ onClick, theme = 'light' }: { onClick?: () => void; theme?: StatusBarTheme }) {
  const bg = theme === 'dark' ? 'bg-black/80' : 'bg-white/75';
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[20px] flex justify-center items-center z-[110] cursor-pointer"
      onClick={onClick}
    >
      <div className={`w-[130px] h-[5px] rounded-full transition-transform active:scale-x-110 shadow-sm ${bg}`} />
    </div>
  );
}
