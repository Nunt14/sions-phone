import type { CallEntry } from './data';
import PhoneHeader from './PhoneHeader';
import { ArrowIcon, Avatar, HandsetIcon, P } from './ui';

export default function CallsTab({ calls, onCall }: { calls: CallEntry[]; onCall: (name: string) => void }) {
  return (
    <>
      <PhoneHeader title="Calls" />
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', scrollbarWidth: 'none', paddingTop: 8, paddingBottom: 110 }}>
        {calls.map((c, i) => (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', paddingLeft: 16 }}>
            <Avatar size={45} />
            <div
              style={{
                flex: 1,
                minWidth: 0,
                marginLeft: 12,
                padding: '9px 16px 9px 0',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                borderBottom: i === calls.length - 1 ? 'none' : `1px solid ${P.line}`,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: c.direction === 'missed' ? P.red : '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 1, fontSize: 13, color: P.gray }}>
                  {c.direction !== 'missed' ? <ArrowIcon outgoing={c.direction === 'outgoing'} /> : <ArrowIcon outgoing={false} />}
                  {c.kind}
                </div>
              </div>
              <span style={{ fontSize: 14, color: P.gray, flexShrink: 0 }}>{c.time}</span>
              <button
                type="button"
                aria-label={`โทรหา ${c.name}`}
                onClick={() => onCall(c.name)}
                style={{ width: 40, height: 40, flexShrink: 0, borderRadius: '50%', background: P.pill, color: P.blue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <HandsetIcon size={19} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
