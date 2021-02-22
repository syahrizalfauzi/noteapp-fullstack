import api from "./Api";
import Note from "../models/NoteModel";

interface DatabasePushResponse {
  error: boolean | any;
  message: string;
}

export const getNotes = async (): Promise<Note[]> => {
  const token = localStorage.getItem("token");
  if (!token) return [];
  const response = await api.get("/note", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.data.results;
};

export const createNote = async (note: Note): Promise<DatabasePushResponse> => {
  const token = localStorage.getItem("token");
  if (!token)
    return { error: true, message: "User unauthorized, please re-log in" };
  try {
    const response = await api.post(
      "/note",
      { ...note },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch ({ response }) {
    if (response) return response.data;
    return { error: true, message: "No respond from server" };
  }
};

export const updateNote = async (note: Note): Promise<DatabasePushResponse> => {
  const token = localStorage.getItem("token");
  if (!token)
    return { error: true, message: "User unauthorized, please re-log in" };
  try {
    const response = await api.put(
      "/note",
      { ...note },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch ({ response }) {
    if (response) return response.data;
    return { error: true, message: "No respond from server" };
  }
};
export const deleteNote = async (note: Note): Promise<DatabasePushResponse> => {
  const token = localStorage.getItem("token");
  if (!token)
    return { error: true, message: "User unauthorized, please re-log in" };
  try {
    const response = await api.delete("/note", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: { ...note },
    });
    return response.data;
  } catch ({ response }) {
    if (response) return response.data;
    return { error: true, message: "No respond from server" };
  }
};
