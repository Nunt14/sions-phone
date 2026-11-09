import { CURRENT } from './data';
import { ArrowIcon } from './ui';

export default function HeaderBlock() {
  return (
    <div style={{ textAlign: 'center', padding: '26px 16px 0', marginBottom: 58 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, letterSpacing: 0.4 }}>
        <ArrowIcon /> {CURRENT.label}
      </div>
      <div style={{ fontSize: 36, marginTop: 2 }}>{CURRENT.city}</div>
      <div style={{ fontSize: 100, fontWeight: 300, lineHeight: 1.05, marginLeft: 12 }}>{CURRENT.temp}°</div>
      <div style={{ fontSize: 17, marginTop: 6 }}>Feels Like: {CURRENT.feelsLike}°</div>
      <div style={{ fontSize: 17, marginTop: 4 }}>H:{CURRENT.hi}° L:{CURRENT.lo}°</div>
    </div>
  );
}
