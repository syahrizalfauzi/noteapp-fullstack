import { useCallback, useState } from "react";
import createModel from "react-scoped-model";
import Note from "./NoteModel";
import { Color } from "@material-ui/lab/Alert";

import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../services/Database";

interface SnackbarNotifier {
  isOpened: boolean;
  message: string;
  severity: Color | undefined;
}

const AppState = createModel(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setNote] = useState<Note>({
    title: "",
    content: "",
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentNotes, setNotes] = useState<Note[]>([]);
  const [snackbar, setSnackbar] = useState<SnackbarNotifier>({
    isOpened: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((state) => ({ ...state, isOpened: false }));
  }, []);

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

  const fetchNotes = useCallback(
    (reset?: boolean) => {
      if (reset) setCurrentNotes([]);
      getNotes().then((response) => {
        if (response.error)
          return setSnackbar({
            isOpened: true,
            message: response.message,
            severity: "error",
          });

        setCurrentNotes(response.results);
      });
    },
    [setCurrentNotes]
  );
  const pushNote = useCallback(() => {
    if (!currentNote.id) {
      createNote({
        title,
        content,
      }).then((response) => {
        if (response.error) {
          return setSnackbar({
            isOpened: true,
            message: response.message,
            severity: "error",
          });
        }
        fetchNotes();
        setEditing(false);
      });
    } else {
      updateNote({
        id: currentNote.id,
        title,
        content,
      }).then((response) => {
        if (response.error) {
          return setSnackbar({
            isOpened: true,
            message: response.message,
            severity: "error",
          });
        }
        fetchNotes();
        setEditing(false);
      });
    }
  }, [content, currentNote.id, fetchNotes, setEditing, title]);
  const removeNote = useCallback(() => {
    deleteNote(currentNote).then((response) => {
      if (response.error) {
        return setSnackbar({
          isOpened: true,
          message: response.message,
          severity: "error",
        });
      }
      fetchNotes();
      setEditing(false);
    });
  }, [currentNote, fetchNotes, setEditing]);

  return {
    isEditing,
    currentNote,
    currentNotes,
    snackbar,
    title,
    content,
    setEditing,
    setCurrentNotes,
    handleCloseSnackbar,
    setCurrentTitle,
    setCurrentContent,
    fetchNotes,
    pushNote,
    removeNote,
  };
});

export default AppState;
