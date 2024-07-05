"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import NoteForm from "../../components/NotesForm";
import { addNote } from "../../store/notesSlice";
import { AppDispatch } from "../../store";
import { Note } from "../../types";

const NewNote: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSave = async (newNote: Note) => {
    const response = await fetch("http://localhost:3001/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });

    if (response.ok) {
      const savedNote = await response.json();
      dispatch(addNote(savedNote));
      router.push(`/notes/${savedNote.id}`);
    } else {
      console.error("Failed to save note");
    }
  };

  return <NoteForm onSave={handleSave} />;
};

export default NewNote;
