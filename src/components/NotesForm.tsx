"use client";

import { useState } from "react";
import { Note } from "../types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import styles from "./NotesForm.module.css";

interface NoteFormProps {
  note?: Note;
  onSave: (note: Note) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  note = { title: "", content: "" },
  onSave,
}) => {
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...note, title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.label + " form-group"}>
        <label htmlFor="title">Заголовок</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.label + " form-group"}>
        <label htmlFor="content">Содержимое</label>
        <textarea
          id="content"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Сохранить
      </button>
    </form>
  );
};

export default NoteForm;
