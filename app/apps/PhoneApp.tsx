'use client';
import { useState } from 'react';
import PhoneTabBar, { type PhoneTab } from './phone/PhoneTabBar';
import CallsTab from './phone/CallsTab';
import ContactsTab from './phone/ContactsTab';
import KeypadTab from './phone/KeypadTab';
import CallScreen from './phone/CallScreen';
import { INITIAL_CALLS, type CallEntry } from './phone/data';

export default function PhoneApp() {
  const [tab, setTab] = useState<PhoneTab>('calls');
  const [calls, setCalls] = useState<CallEntry[]>(INITIAL_CALLS);
  const [calling, setCalling] = useState<string | null>(null); // ชื่อ/เบอร์ที่กำลังโทรหา

  // วางสายแล้วบันทึกเป็นสายโทรออกบนสุดของรายการ Calls
  const endCall = () => {
    if (calling) {
      const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      setCalls((list) => [{ id: Date.now(), name: calling, kind: 'mobile', direction: 'outgoing', time }, ...list]);
    }
    setCalling(null);
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#fff', color: '#000' }}>
      {tab === 'calls' && <CallsTab calls={calls} onCall={setCalling} />}
      {tab === 'contacts' && <ContactsTab onCall={setCalling} />}
      {tab === 'keypad' && <KeypadTab onCall={setCalling} />}

      <PhoneTabBar tab={tab} onChange={setTab} />

      {calling !== null && <CallScreen label={calling} onEnd={endCall} />}
    </div>
  );
}
