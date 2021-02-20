import noteModel from "../models/noteModel.js";

const getNote = (req, res) => {
  const { userId } = req.body;

  return noteModel.getNoteByUserId(userId, (error, results) => {
    if (error) return res.status(500).send({ error });
    return res.status(200).send({ results });
  });
};

const createNote = (req, res) => {
  const { title, content, userId } = req.body;

  return noteModel.createNote(title, content, userId, (error) => {
    if (error) return res.status(500).send({ error });
    return res.status(201).send({ message: "Note created" });
  });
};

const updateNote = (req, res) => {
  const { title, content, id, userId } = req.body;

  return noteModel.updateNote(title, content, id, userId, (error, result) => {
    if (error) return res.status(500).send({ error });
    else if (result.affectedRows === 0)
      return res.status(400).send({ message: "No note found" });
    return res.status(201).send({ message: "Note updated" });
  });
};

const deleteNote = (req, res) => {
  const { id, userId } = req.body;

  return noteModel.deleteNote(id, userId, (error, result) => {
    if (error) return res.status(500).send({ error });
    else if (result.affectedRows === 0)
      return res.status(400).send({ message: "No note found" });
    return res.status(202).send({ message: "Note deleted" });
  });
};

export default {
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
