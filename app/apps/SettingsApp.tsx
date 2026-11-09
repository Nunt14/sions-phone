'use client';
import { useState } from 'react';

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)} className={`w-[51px] h-[31px] rounded-full p-[2px] transition-colors ${on ? 'bg-[#34c759]' : 'bg-zinc-300'}`}>
      <span className={`block w-[27px] h-[27px] rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  );
}

function Row({ color, icon, label, right }: { color: string; icon: string; label: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 pl-3 pr-3 py-2">
      <span className="w-[29px] h-[29px] rounded-[7px] flex items-center justify-center text-[16px]" style={{ background: color }}>{icon}</span>
      <span className="flex-1 text-[16px]">{label}</span>
      {right}
    </div>
  );
}

const Value = ({ v }: { v?: string }) => <span className="text-[15px] text-zinc-400">{v} ›</span>;
const Group = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-xl divide-y divide-zinc-200 mb-4 overflow-hidden">{children}</div>
);

export default function SettingsApp() {
  const [airplane, setAirplane] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto text-black px-4 pb-10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
      <h1 className="text-[32px] font-bold tracking-tight pt-2 pb-3">การตั้งค่า</h1>

      <Group>
        <div className="flex items-center gap-3 p-3">
          <span className="w-14 h-14 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 flex items-center justify-center text-2xl text-white">J</span>
          <div className="flex-1">
            <div className="text-[18px] font-medium">jjune</div>
            <div className="text-[13px] text-zinc-500">Apple Account, iCloud และอื่นๆ</div>
          </div>
        </div>
      </Group>

      <Group>
        <Row color="#ff9500" icon="✈️" label="โหมดเครื่องบิน" right={<Toggle on={airplane} onChange={setAirplane} />} />
        <Row color="#007aff" icon="📶" label="Wi-Fi" right={<Value v={airplane ? 'ปิด' : 'Home_5G'} />} />
        <Row color="#007aff" icon="🔷" label="Bluetooth" right={<Value v="เปิด" />} />
        <Row color="#34c759" icon="📡" label="เครือข่ายมือถือ" right={<Value />} />
      </Group>

      <Group>
        <Row color="#ff3b30" icon="🔔" label="การแจ้งเตือน" right={<Value />} />
        <Row color="#ff2d55" icon="🔊" label="เสียงและแรงสั่น" right={<Value />} />
        <Row color="#5856d6" icon="🌙" label="โฟกัส" right={<Toggle on={focus} onChange={setFocus} />} />
        <Row color="#5856d6" icon="⏳" label="เวลาหน้าจอ" right={<Value />} />
      </Group>

      <Group>
        <Row color="#8e8e93" icon="⚙️" label="ทั่วไป" right={<Value />} />
        <Row color="#8e8e93" icon="🎛️" label="ศูนย์ควบคุม" right={<Value />} />
        <Row color="#007aff" icon="☀️" label="จอภาพและความสว่าง" right={<Value />} />
      </Group>
    </div>
  );
}
