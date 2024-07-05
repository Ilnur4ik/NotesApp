"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { setNotes } from "../store/notesSlice";
import NotesList from "../components/NotesList";
import { Note } from "../types";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:3001/notes");
        const data: Note[] = await res.json();
        dispatch(setNotes(data));
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, [dispatch]);

  return <NotesList notes={notes} />;
};

export default Home;
