import HeaderBlock from './weather/HeaderBlock';
import HourlyCard from './weather/HourlyCard';
import DailyCard from './weather/DailyCard';
import DetailTiles from './weather/DetailTiles';
import BottomBar from './weather/BottomBar';

export default function WeatherApp() {
  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #2f78b6 0%, #3f87c5 35%, #8fb6da 100%)',
      }}
    >
      {/* แสงจางๆ มุมซ้ายบน */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 8% 0%, rgba(255,255,255,0.28), rgba(255,255,255,0) 42%)' }} />

      <div style={{ position: 'relative', flex: 1, minHeight: 0, overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 110 }}>
        <HeaderBlock />
        <HourlyCard />
        <DailyCard />
        <DetailTiles />
      </div>

      <BottomBar />
    </div>
  );
}
