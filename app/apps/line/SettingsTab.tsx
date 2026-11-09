import { ChevronRight, L } from './ui';

const ROWS = ['Profile', 'Friends', 'Chats', 'Calls', 'Notifications', 'Themes', 'Privacy', 'About LINE'];

export default function SettingsTab() {
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 110 }}>
      <h1 style={{ margin: '14px 16px 8px', fontSize: 26, fontWeight: 800 }}>Settings</h1>
      {ROWS.map((r) => (
        <div key={r} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: `1px solid ${L.border}`, fontSize: 16 }}>
          {r}
          <span style={{ color: L.gray, display: 'flex' }}><ChevronRight /></span>
        </div>
      ))}
    </div>
  );
}
