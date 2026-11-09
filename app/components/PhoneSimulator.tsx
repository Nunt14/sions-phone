'use client';
import { useState } from 'react';
import PhoneFrame from './phone/PhoneFrame';
import LockScreen from './phone/LockScreen';
import PasscodeScreen from './phone/PasscodeScreen';
import HomeScreen from './phone/HomeScreen';
import AppWindow from './phone/AppWindow';
import { useRealTime } from '../hooks/useRealTime';
import type { AppDefinition, Origin } from '../lib/types';

type Screen = 'lock' | 'passcode' | 'home';

export default function PhoneSimulator() {
  const [screen, setScreen] = useState<Screen>('lock');
  const [opened, setOpened] = useState<{ app: AppDefinition; origin: Origin } | null>(null);
  const { time, date } = useRealTime();

  const OpenedApp = opened?.app.component;

  return (
    <PhoneFrame>
      {screen === 'lock' && <LockScreen time={time} date={date} onUnlock={() => setScreen('passcode')} />}

      {screen === 'passcode' && (
        <PasscodeScreen time={time} onSuccess={() => setScreen('home')} onCancel={() => setScreen('lock')} />
      )}

      {screen === 'home' && (
        <HomeScreen
          time={time}
                    onOpenApp={(app, origin) => {
            if (app.url) {
              window.open(app.url, '_blank', 'noopener,noreferrer');
              return;
            }
            setOpened({ app, origin });
          }}
          onLock={() => { setOpened(null); setScreen('lock'); }}
        />
      )}

      {opened && OpenedApp && (
        <AppWindow
          key={opened.app.id}
          origin={opened.origin}
          background={opened.app.background}
          statusBar={opened.app.statusBar}
          time={time}
          onClosed={() => setOpened(null)}
        >
          <OpenedApp />
        </AppWindow>
      )}
    </PhoneFrame>
  );
}
