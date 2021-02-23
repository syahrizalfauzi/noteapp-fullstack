const connection = require("../db.js");

const getNoteByUserId = (userId, callback) => {
  connection.connect((_) => {
    connection.query(
      "SELECT id, title, content, time FROM notes WHERE userId = ? ORDER BY time DESC",
      userId,
      callback
    );
  });
};

const createNote = (title, content, userId, callback) => {
  connection.connect((_) => {
    connection.query(
      "INSERT INTO notes (title, content, userId) VALUES (?,?,?)",
      [title, content, userId],
      callback
    );
  });
};

const updateNote = (title, content, noteId, userId, callback) => {
  connection.connect((_) => {
    connection.query(
      "UPDATE notes SET title = ?, content = ?, time = CURRENT_TIMESTAMP WHERE id = ? AND userid = ?",
      [title, content, noteId, userId],
      callback
    );
  });
};

const deleteNote = (noteId, userId, callback) => {
  connection.connect((_) => {
    connection.query(
      "DELETE FROM notes WHERE id = ? AND userid = ?",
      [noteId, userId],
      callback
    );
  });
};

module.exports = {
  getNoteByUserId,
  createNote,
  updateNote,
  deleteNote,
};
