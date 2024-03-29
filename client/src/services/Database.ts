import api from "./Api";
import Note from "../models/NoteModel";

interface DatabasePushResponse {
  error: boolean | any;
  message: string;
}
interface DatabaseFetchResponse {
  error: boolean | any;
  message: string;
  results: Note[];
}

export const getNotes = async (): Promise<DatabaseFetchResponse> => {
  const token = localStorage.getItem("token");
  if (!token)
    return {
      error: true,
      message: "Unauthorized access, please re-login",
      results: [],
    };

  let timer = setTimeout(() => {
    throw new Error();
  }, 5000);
  try {
    const response = await api.get("/note", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    clearTimeout(timer);
    return response.data;
  } catch ({ response }) {
    clearTimeout(timer);
    if (response) return { ...response.data, payload: [] };
    return {
      error: true,
      message: "Request timeout, please try again later",
      results: [],
    };
  }
};

export const createNote = async (note: Note): Promise<DatabasePushResponse> => {
  const token = localStorage.getItem("token");
  if (!token)
    return { error: true, message: "User unauthorized, please re-log in" };
  let timer = setTimeout(() => {
    throw new Error();
  }, 5000);
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
    clearTimeout(timer);
    return response.data;
  } catch ({ response }) {
    clearTimeout(timer);
    if (response) return response.data;
    return { error: true, message: "No respond from server" };
  }
};

export const updateNote = async (note: Note): Promise<DatabasePushResponse> => {
  const token = localStorage.getItem("token");
  if (!token)
    return { error: true, message: "User unauthorized, please re-log in" };
  let timer = setTimeout(() => {
    throw new Error();
  }, 5000);
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
    clearTimeout(timer);
    return response.data;
  } catch ({ response }) {
    clearTimeout(timer);
    if (response) return response.data;
    return { error: true, message: "No respond from server" };
  }
};
export const deleteNote = async (note: Note): Promise<DatabasePushResponse> => {
  const token = localStorage.getItem("token");
  if (!token)
    return { error: true, message: "User unauthorized, please re-log in" };
  let timer = setTimeout(() => {
    throw new Error();
  }, 5000);
  try {
    const response = await api.delete("/note", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: { ...note },
    });
    clearTimeout(timer);
    return response.data;
  } catch ({ response }) {
    clearTimeout(timer);
    if (response) return response.data;
    return { error: true, message: "No respond from server" };
  }
};
