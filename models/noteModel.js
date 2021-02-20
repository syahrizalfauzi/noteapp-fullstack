import connection from "../db/db.js";

const getNoteByUserId = (userId, callback) => {
  connection.query(
    "SELECT id, title, content, time FROM notes WHERE userId = ?",
    userId,
    callback
  );
};

const createNote = (title, content, userId, callback) => {
  connection.query(
    "INSERT INTO notes (title, content, time, userId) VALUES (?,?,CURRENT_TIME(),?)",
    [title, content, userId],
    callback
  );
};

const updateNote = (title, content, noteId, userId, callback) => {
  connection.query(
    "UPDATE notes SET title = ?, content = ?, time = CURRENT_TIME() WHERE id = ? AND userid = ?",
    [title, content, noteId, userId],
    callback
  );
};

const deleteNote = (noteId, userId, callback) => {
  connection.query(
    "DELETE FROM notes WHERE id = ? AND userid = ?",
    [noteId, userId],
    callback
  );
};

export default {
  getNoteByUserId,
  createNote,
  updateNote,
  deleteNote,
};
