"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { Note } from "../../../types";
import { setNotes } from "../../../store/notesSlice";
import Link from "next/link";

const NotePage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:3001/notes");
        const data: Note[] = await res.json();
        console.log("Fetched notes:", data);
        dispatch(setNotes(data));
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    if (!notes.length) {
      fetchNotes();
    } else if (id) {
      const foundNote = notes.find(
        (note) => note.id?.toString() === id.toString()
      );
      setNote(foundNote || null);
      console.log("Found note:", foundNote);
    }
  }, [dispatch, id, notes]);

  if (!note) return <div>Загрузка...</div>;

  return (
    <div>
      {note && note.id && (
        <div>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <Link href={`/edit/${note.id}`} className="btn btn-primary">
            Редактировать
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotePage;
