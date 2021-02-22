import { useCallback, useState } from "react";
import createModel from "react-scoped-model";
import Note from "./NoteModel";
import User from "./UserModel";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../services/Database";

const AppState = createModel(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setNote] = useState<Note>({
    title: "",
    content: "",
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentNotes, setNotes] = useState<Note[]>([]);
  const [currentUser, setUser] = useState<User | null>(null);

  const setCurrentTitle = useCallback((title: string) => {
    setTitle(title);
  }, []);
  const setCurrentContent = useCallback((content: string) => {
    setContent(content);
  }, []);
  const setEditing = useCallback((editing: boolean, note?: Note) => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setNote(note);
    }
    setIsEditing(editing);
  }, []);
  const setCurrentNotes = useCallback((newNotes: Note[]) => {
    setNotes(newNotes);
  }, []);
  const setCurrentUser = useCallback(
    (newUser: User) => {
      setUser(newUser);
      setCurrentNotes([]);
      setEditing(false);
    },
    [setCurrentNotes, setEditing]
  );

  const fetchNotes = useCallback(() => {
    getNotes().then((notes) => {
      setCurrentNotes(notes);
    });
  }, [setCurrentNotes]);
  const pushNote = useCallback(() => {
    if (!currentNote.id) {
      createNote({
        title,
        content,
      })
        .then((_) => fetchNotes())
        .then((_) => setEditing(false));
    } else {
      updateNote({
        id: currentNote.id,
        title,
        content,
      })
        .then((_) => fetchNotes())
        .then((_) => setEditing(false));
    }
  }, [content, currentNote.id, fetchNotes, setEditing, title]);
  const removeNote = useCallback(() => {
    deleteNote(currentNote)
      .then((_) => fetchNotes())
      .then((_) => setEditing(false));
  }, [currentNote, fetchNotes, setEditing]);

  return {
    isEditing,
    currentNote,
    currentNotes,
    currentUser,
    title,
    content,
    setEditing,
    setCurrentNotes,
    setCurrentUser,
    setCurrentTitle,
    setCurrentContent,
    fetchNotes,
    pushNote,
    removeNote,
  };
});

export default AppState;
