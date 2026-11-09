import { CURRENT, HOURLY } from './data';
import WeatherIcon from './WeatherIcon';
import { W, card } from './ui';

export default function HourlyCard() {
  const hour = new Date().getHours();

  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Conditions</div>
          <div style={{ fontSize: 12, color: W.soft, marginTop: 3 }}>Temperature (°C)</div>
        </div>
        <div style={{ fontSize: 12, marginTop: 4 }}>{CURRENT.condition}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
        {HOURLY.map((h, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minWidth: 34 }}>
            <span style={{ fontSize: 14 }}>{i === 0 ? 'Now' : (hour + i) % 24}</span>
            <WeatherIcon kind={h.icon} size={24} />
            <span style={{ fontSize: 15 }}>{h.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
