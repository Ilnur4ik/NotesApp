"use client";

import styles from "./NotesList.module.css";
import { Note } from "../types";

interface NotesListProps {
  notes: Note[];
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  return (
    <div className={styles.list}>
      {notes.map((note) => (
        <div key={note.id} className={styles.note}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <a href={`/notes/${note.id}`} className="btn btn-primary">
            Просмотреть
          </a>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
