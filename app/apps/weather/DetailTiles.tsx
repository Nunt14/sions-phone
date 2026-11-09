import { CURRENT } from './data';
import { ThermoIcon, card, tileLabel } from './ui';

const tile = { ...card, margin: 0, display: 'flex', flexDirection: 'column' as const };
const big = { fontSize: 40, fontWeight: 300, lineHeight: 1.1, marginTop: 6 };

export default function DetailTiles() {
  return (
    <div style={{ margin: '0 14px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ ...tile, flex: 1, minHeight: 150 }}>
          <div style={tileLabel}><ThermoIcon /> Feels Like</div>
          <div style={big}>{CURRENT.feelsLike}°</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>Actual: {CURRENT.temp}°</div>
          <div style={{ fontSize: 13, marginTop: 'auto', paddingTop: 10, lineHeight: 1.35 }}>
            It feels warmer than the actual temperature.
          </div>
        </div>

        <div style={{ ...tile, flex: 1, minHeight: 150 }}>
          <div style={tileLabel}>Humidity</div>
          <div style={big}>{CURRENT.humidity}%</div>
          <div style={{ fontSize: 13, marginTop: 'auto' }}>Relative humidity</div>
        </div>
      </div>

      <div style={{ ...tile, minHeight: 130 }}>
        <div style={tileLabel}>Wind</div>
        <div style={big}>
          {CURRENT.windKmh} <span style={{ fontSize: 18, fontWeight: 400 }}>km/h</span>
        </div>
        <div style={{ fontSize: 13, marginTop: 'auto', paddingTop: 10 }}>Gusts {CURRENT.gustsKmh} km/h</div>
      </div>
    </div>
  );
}
