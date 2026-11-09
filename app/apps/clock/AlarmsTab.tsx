'use client';
import { useState } from 'react';
import { C, ClockHeader, pillButton, row, scrollArea } from './ui';

interface Alarm {
  id: number;
  time: string; // 'HH:MM'
  label: string;
  enabled: boolean;
}

// แก้รายการปลุกเริ่มต้นที่นี่
const INITIAL_ALARMS: Alarm[] = [
  { id: 1, time: '07:30', label: 'ไปค่ากะเทย ตื่นไปทำงาน', enabled: true },
  { id: 2, time: '08:10', label: 'ทำงาน หาเงินจ้า', enabled: true },
  { id: 3, time: '08:20', label: 'ไม่ตื่นอีก', enabled: true },
];

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      style={{
        position: 'relative',
        width: 54,
        height: 32,
        flexShrink: 0,
        borderRadius: 16,
        background: on ? C.green : C.knobOff,
        transition: 'background .2s',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: on ? 24 : 2,
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          transition: 'left .2s',
        }}
      />
    </button>
  );
}

export default function AlarmsTab() {
  const [alarms, setAlarms] = useState<Alarm[]>(INITIAL_ALARMS);
  const [editing, setEditing] = useState(false);

  const update = (id: number, patch: Partial<Alarm>) =>
    setAlarms((list) => list.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  const remove = (id: number) => setAlarms((list) => list.filter((a) => a.id !== id));
  const add = () => setAlarms((list) => [...list, { id: Date.now(), time: '07:00', label: 'Alarm', enabled: true }]);

  return (
    <>
      <ClockHeader title="Alarms">
        <button type="button" onClick={() => setEditing((e) => !e)} style={pillButton}>
          {editing ? 'Done' : 'Edit'}
        </button>
        <button type="button" onClick={add} aria-label="เพิ่มนาฬิกาปลุก" style={{ ...pillButton, width: 55, padding: 0, fontSize: 26, fontWeight: 300 }}>
          +
        </button>
      </ClockHeader>

      <div style={{ ...scrollArea, margin: '26px 16px 0', borderTop: `1px solid ${C.line}` }}>
        {alarms.map((a) => (
          <div key={a.id} style={{ ...row, gap: 12, padding: '10px 0 12px', borderBottom: `1px solid ${C.line}` }}>
            {editing && (
              <button
                type="button"
                onClick={() => remove(a.id)}
                aria-label="ลบ"
                style={{ ...row, justifyContent: 'center', width: 22, height: 22, flexShrink: 0, borderRadius: '50%', background: C.red, color: '#fff', fontSize: 16, lineHeight: 1 }}
              >
                −
              </button>
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              {editing ? (
                <input
                  type="time"
                  value={a.time}
                  onChange={(e) => update(a.id, { time: e.target.value })}
                  style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', colorScheme: 'dark', fontSize: 44, fontWeight: 300 }}
                />
              ) : (
                <div style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.1, letterSpacing: -1.5, opacity: a.enabled ? 1 : 0.45 }}>
                  {a.time}
                </div>
              )}

              {editing ? (
                <input
                  value={a.label}
                  onChange={(e) => update(a.id, { label: e.target.value })}
                  style={{ marginTop: 4, width: 160, padding: '4px 8px', borderRadius: 6, background: C.card, border: 'none', outline: 'none', color: '#fff', fontSize: 14 }}
                />
              ) : (
                <div style={{ fontSize: 14, marginTop: 2, color: a.enabled ? '#fff' : C.gray }}>{a.label}</div>
              )}
            </div>

            <Toggle on={a.enabled} onChange={() => update(a.id, { enabled: !a.enabled })} />
          </div>
        ))}
      </div>
    </>
  );
}
