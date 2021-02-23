import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/styles";
import NoteCard from "./NoteCard";
import Editor from "./Editor";

import { useHistory } from "react-router-dom";
import AppState from "../../models/AppState";
import { useSelectors } from "react-scoped-model";
import { useEffect } from "react";

const useStyles = makeStyles({
  centerTitle: {
    justifyContent: "space-between",
    color: "white",
    padding: "4px 16px",
  },
  logoutButton: {
    float: "right",
  },
  body: {
    padding: "16px",
    height: "100%",
  },
  fab: {
    position: "fixed",
    right: "20px",
    bottom: "20px",
  },
  backdrop: {
    zIndex: 1,
  },
  wrapper: {
    height: "100%",
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  emptyText: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

const Home = () => {
  const classes = useStyles();
  const navigator = useHistory();
  const [
    isEditing,
    setEditing,
    fetchNotes,
    currentNotes,
  ] = useSelectors(AppState, (state) => [
    state.isEditing,
    state.setEditing,
    state.fetchNotes,
    state.currentNotes,
  ]);

  const handleFab = () => {
    setEditing(true, {
      title: "New note",
      content: "",
      time: "Date",
    });
  };
  const handleCloseModal = () => {
    setEditing(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.dispatchEvent(new Event("storage"));
    navigator.replace("/login");
  };
  const mainComponent = () => {
    if (currentNotes.length !== 0)
      return (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 0: 1, 600: 2, 960: 3, 1280: 4 }}
        >
          <Masonry gutter="16px">
            {currentNotes.map((note) => (
              <NoteCard {...note} key={note.id} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      );
    else
      return (
        <Typography className={classes.emptyText}>No notes yet</Typography>
      );
  };

  useEffect(() => {
    fetchNotes(true);
  }, [fetchNotes]);

  return (
    <>
      <Modal
        open={isEditing}
        onClose={handleCloseModal}
        className={classes.modal}
      >
        <>
          <Editor />
        </>
      </Modal>
      <AppBar position="static" color="inherit">
        <Toolbar className={classes.centerTitle}>
          <Typography variant="h5" style={{ flex: 1 }}>
            Notes<Typography>{localStorage.getItem("username")}</Typography>
          </Typography>

          <IconButton color="inherit" onClick={() => fetchNotes(false)}>
            <RefreshIcon />
          </IconButton>
          <IconButton color="secondary" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.body}>
        <Grid item xs={false} sm={1}></Grid>
        <Grid item xs={12} sm={10}>
          {mainComponent()}
        </Grid>
        <Grid item xs={false} sm={1}></Grid>
      </Grid>
      <Fab
        color="default"
        className={classes.fab}
        children={<AddIcon color="inherit" />}
        onClick={handleFab}
      />
    </>
  );
};

export default Home;
