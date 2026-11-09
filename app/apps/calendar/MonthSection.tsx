import type { Ref } from 'react';
import { DOT_COLORS, EVENTS, MONTH_NAMES, WEEKDAYS, YEAR } from './data';
import { K } from './ui';

interface Props {
  month: number; // 0-11
  today: { y: number; m: number; d: number };
  innerRef?: Ref<HTMLDivElement>;
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function MonthSection({ month, today, innerRef }: Props) {
  const firstDay = new Date(YEAR, month, 1).getDay();
  const daysInMonth = new Date(YEAR, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array<null>(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));

  const grid = { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' } as const;

  return (
    <section ref={innerRef} style={{ paddingTop: 30 }}>
      <h2 style={{ margin: 0, padding: '0 16px', fontSize: 32, fontWeight: 800, letterSpacing: -0.5, color: '#111' }}>
        {MONTH_NAMES[month]}
      </h2>

      <div style={{ ...grid, padding: '16px 0 6px' }}>
        {WEEKDAYS.map((w, i) => (
          <span key={i} style={{ textAlign: 'center', fontSize: 10, color: K.gray }}>{w}</span>
        ))}
      </div>

      {weeks.map((week, wi) => (
        <div key={wi} style={{ ...grid, height: 65, borderTop: `1px solid ${K.line}` }}>
          {week.map((d, di) => {
            if (d === null) return <div key={di} />;
            const key = `${YEAR}-${pad(month + 1)}-${pad(d)}`;
            const dot = EVENTS[key];
            const isToday = today.y === YEAR && today.m === month && today.d === d;
            const weekend = di === 0 || di === 6;

            return (
              <div key={di} style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 19,
                    background: isToday ? K.red : 'transparent',
                    color: isToday ? '#fff' : weekend ? K.gray : '#000',
                  }}
                >
                  {d}
                </span>
                {dot && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 54,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: DOT_COLORS[dot],
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
}
