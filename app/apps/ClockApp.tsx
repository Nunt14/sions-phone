'use client';
import { useState } from 'react';
import ClockTabBar, { type ClockTab } from './clock/ClockTabBar';
import AlarmsTab from './clock/AlarmsTab';
import WorldClockTab from './clock/WorldClockTab';
import StopwatchTab from './clock/StopwatchTab';
import TimersTab from './clock/TimersTab';

export default function ClockApp() {
  const [tab, setTab] = useState<ClockTab>('alarms');

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#000', color: '#fff' }}>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {tab === 'world' && <WorldClockTab />}
        {tab === 'alarms' && <AlarmsTab />}
        {tab === 'stopwatch' && <StopwatchTab />}
        {tab === 'timers' && <TimersTab />}
      </div>
      <ClockTabBar tab={tab} onChange={setTab} />
    </div>
  );
}
