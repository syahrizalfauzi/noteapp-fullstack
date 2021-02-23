const noteModel = require("../models/noteModel.js");

const getNote = (req, res) => {
  const { userId } = req.body;

  return noteModel.getNoteByUserId(userId, (error, results) => {
    if (error) {
      console.log("getNoteByUserId database error", error);
      return res.status(500).send({ error, message: "Database error" });
    }
    return res
      .status(200)
      .send({ error: false, message: "Notes fetched", results });
  });
};

const createNote = (req, res) => {
  const { title, content, userId } = req.body;

  return noteModel.createNote(title, content, userId, (error) => {
    if (error) {
      console.log("createNote database error", error);
      return res.status(500).send({ error, message: "Database error" });
    }
    return res.status(201).send({ error: false, message: "Note created" });
  });
};

const updateNote = (req, res) => {
  const { title, content, id, userId } = req.body;

  return noteModel.updateNote(title, content, id, userId, (error, result) => {
    if (error) {
      console.log("updateNote database error", error);
      return res.status(500).send({ error, message: "Database error" });
    } else if (result.affectedRows === 0)
      return res.status(200).send({ error: true, message: "No note found" });
    return res.status(201).send({ error: false, message: "Note updated" });
  });
};

const deleteNote = (req, res) => {
  const { id, userId } = req.body;

  return noteModel.deleteNote(id, userId, (error, result) => {
    if (error) {
      console.log("deleteNote database error", error);
      return res.status(500).send({ error, message: "Database error" });
    } else if (result.affectedRows === 0)
      return res.status(200).send({ error: true, message: "No note found" });
    return res.status(202).send({ error: false, message: "Note deleted" });
  });
};

module.exports = {
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
