import type { WeatherKind } from './data';

const CLOUD = 'M6.5 19a4 4 0 0 1-.3-7.98A6 6 0 0 1 17.6 10.3 4.4 4.4 0 0 1 17.5 19z';

/** ไอคอนสภาพอากาศแบบ SVG (เมฆขาว ดวงอาทิตย์เหลือง ฝนฟ้า) */
export default function WeatherIcon({ kind, size = 24 }: { kind: WeatherKind; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      {(kind === 'cloud-sun' || kind === 'sun') && <circle cx={kind === 'sun' ? 12 : 8} cy={kind === 'sun' ? 12 : 8} r={kind === 'sun' ? 5 : 3.6} fill="#fcd34d" />}
      {kind === 'cloud-sun' && <path d={CLOUD} fill="#fff" transform="translate(2 2.5) scale(0.85)" />}
      {kind === 'cloud' && <path d={CLOUD} fill="#fff" transform="translate(0 1)" />}
      {kind === 'rain' && (
        <>
          <path d={CLOUD} fill="#fff" transform="translate(1.8 -1.5) scale(0.85)" />
          <path d="M8 18.5l-1 2.5M12 18.5l-1 2.5M16 18.5l-1 2.5" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
