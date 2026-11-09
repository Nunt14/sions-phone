import { CURRENT, DAILY, RANGE_MAX, RANGE_MIN } from './data';
import WeatherIcon from './WeatherIcon';
import { W, card } from './ui';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const pct = (t: number) => ((t - RANGE_MIN) / (RANGE_MAX - RANGE_MIN)) * 100;

export default function DailyCard() {
  const today = new Date().getDay();

  return (
    <div style={{ ...card, padding: '4px 16px' }}>
      {DAILY.map((d, i) => (
        <div
          key={i}
          style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${W.line}` }}
        >
          <span style={{ width: 54, fontSize: 17 }}>{i === 0 ? 'Today' : DAY_NAMES[(today + i) % 7]}</span>
          <span style={{ width: 34, display: 'flex' }}><WeatherIcon kind={d.icon} size={24} /></span>
          <span style={{ width: 36, fontSize: 17, color: W.soft, textAlign: 'right' }}>{d.lo}°</span>

          <div style={{ position: 'relative', flex: 1, height: 5, margin: '0 8px', borderRadius: 3, background: 'rgba(0,40,90,0.25)' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${pct(d.lo)}%`,
                width: `${pct(d.hi) - pct(d.lo)}%`,
                borderRadius: 3,
                background: 'linear-gradient(90deg, #fbbf24, #f97316)',
              }}
            />
            {i === 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${pct(CURRENT.temp)}%`,
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#fff',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.15)',
                }}
              />
            )}
          </div>

          <span style={{ width: 36, fontSize: 17, textAlign: 'right' }}>{d.hi}°</span>
        </div>
      ))}
    </div>
  );
}
