'use client';
import { useState } from 'react';
import NoteList from './notes/NoteList';
import NoteDetail from './notes/NoteDetail';
import type { Note } from './notes/data';

export default function NotesApp() {
  const [selected, setSelected] = useState<Note | null>(null);

  return selected ? (
    <NoteDetail note={selected} onBack={() => setSelected(null)} />
  ) : (
    <NoteList onOpen={setSelected} />
  );
}
