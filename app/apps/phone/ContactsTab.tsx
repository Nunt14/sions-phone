import { Fragment } from 'react';
import { CONTACTS } from './data';
import PhoneHeader from './PhoneHeader';
import { Avatar, P } from './ui';

export default function ContactsTab({ onCall }: { onCall: (name: string) => void }) {
  const sorted = [...CONTACTS].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <PhoneHeader title="Contacts" />
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', scrollbarWidth: 'none', paddingTop: 8, paddingBottom: 110 }}>
        {sorted.map((name, i) => {
          const letter = name[0].toUpperCase();
          const newGroup = i === 0 || sorted[i - 1][0].toUpperCase() !== letter;
          return (
            <Fragment key={name}>
              {newGroup && (
                <div style={{ padding: '10px 16px 4px', fontSize: 13, fontWeight: 600, color: P.gray }}>{letter}</div>
              )}
              <button
                type="button"
                onClick={() => onCall(name)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '8px 16px', textAlign: 'left' }}
              >
                <Avatar size={40} />
                <span style={{ fontSize: 16, fontWeight: 500 }}>{name}</span>
              </button>
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
