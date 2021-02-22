import noteModel from "../models/noteModel.js";

const getNote = (req, res) => {
  const { userId } = req.body;
  console.log("notes requested by userId ", userId);

  return noteModel.getNoteByUserId(userId, (error, results) => {
    if (error) return res.status(500).send({ error });
    return res.status(200).send({ results });
  });
};

const createNote = (req, res) => {
  const { title, content, userId } = req.body;

  return noteModel.createNote(title, content, userId, (error) => {
    if (error) return res.status(500).send({ error, message: "Server error" });
    return res.status(201).send({ error: false, message: "Note created" });
  });
};

const updateNote = (req, res) => {
  const { title, content, id, userId } = req.body;

  return noteModel.updateNote(title, content, id, userId, (error, result) => {
    if (error) return res.status(500).send({ error });
    else if (result.affectedRows === 0)
      return res.status(200).send({ error: true, message: "No note found" });
    return res.status(201).send({ error: false, message: "Note updated" });
  });
};

const deleteNote = (req, res) => {
  const { id, userId } = req.body;

  return noteModel.deleteNote(id, userId, (error, result) => {
    if (error) return res.status(500).send({ error });
    else if (result.affectedRows === 0)
      return res.status(200).send({ error: true, message: "No note found" });
    return res.status(202).send({ error: false, message: "Note deleted" });
  });
};

export default {
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
