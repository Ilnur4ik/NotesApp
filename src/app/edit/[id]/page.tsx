"use client";

import { useEffect, useState } from "react";
import NoteForm from "../../../components/NotesForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { Note } from "../../../types";
import { updateNote, setNotes } from "../../../store/notesSlice";

const EditNote: React.FC<{ params: { id: string } }> = ({ params }) => {
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

    if (notes.length === 0) {
      fetchNotes();
    } else {
      const foundNote = notes.find((note) => note.id?.toString() === id);
      setNote(foundNote || null);
      console.log("Found note:", foundNote);
    }
  }, [dispatch, id, notes]);

  const handleSave = async (updatedNote: Note) => {
    dispatch(updateNote(updatedNote));
    await fetch(`http://localhost:3001/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });
    window.location.href = `/notes/${id}`;
  };

  if (!note) return <div>Загрузка...</div>;

  return <NoteForm note={note} onSave={handleSave} />;
};

export default EditNote;
