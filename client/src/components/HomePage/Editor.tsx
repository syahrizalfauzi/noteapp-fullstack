import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

import AppState from "../../models/AppState";
import { useSelectors } from "react-scoped-model";
import React, { useState } from "react";
import { TextFormFieldProps } from "../../components/LandingPage/LoginCard";

const useStyles = makeStyles({
  card: {
    maxWidth: "480px",
    margin: "auto",
  },
  title: {
    width: "100%",
    marginBottom: "16px",
  },
  content: {
    width: "100%",
  },
  cardActions: {
    display: "flex",
  },
});

const Editor = () => {
  const classes = useStyles();

  const [
    title,
    content,
    setTitle,
    setContent,
    setEditing,
    pushNote,
    currentNote,
    handleDelete,
  ] = useSelectors(AppState, (state) => [
    state.title,
    state.content,
    state.setCurrentTitle,
    state.setCurrentContent,
    state.setEditing,
    state.pushNote,
    state.currentNote,
    state.removeNote,
  ]);
  const [titleProps, setTitleProps] = useState<TextFormFieldProps>({
    error: false,
    helperText: "",
  });

  const handleClose = () => {
    setEditing(false);
  };
  const handleTitleField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handleSave = () => {
    if (title.length === 0)
      return setTitleProps({ error: true, helperText: "Title can't be empty" });
    pushNote();
  };
  const clearError = () => {
    setTitleProps({ error: false, helperText: "" });
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          value={title}
          onChange={handleTitleField}
          onClick={clearError}
          placeholder="Note title"
          label="Title"
          className={classes.title}
          variant="outlined"
          autoFocus={currentNote.id === undefined}
          {...titleProps}
        />
        <TextField
          value={content}
          onChange={handleContentField}
          onClick={clearError}
          placeholder="Type your notes here..."
          label="Content"
          className={classes.content}
          variant="outlined"
          rows={10}
          rowsMax={20}
          autoFocus={currentNote.id !== undefined}
          multiline
        />
      </CardContent>
      <CardActions className={classes.cardActions}>
        {currentNote.id ? (
          <Button onClick={handleDelete} color="secondary">
            delete
          </Button>
        ) : (
          <div></div>
        )}

        <div style={{ flex: 1 }}></div>
        <Button onClick={handleClose} color="inherit">
          cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          save
        </Button>
      </CardActions>
    </Card>
  );
};

export default Editor;
