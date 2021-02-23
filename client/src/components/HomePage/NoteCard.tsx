import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/styles";

import AppState from "../../models/AppState";
import Note from "../../models/NoteModel";
import { useSelector } from "react-scoped-model";

import moment from "moment";

const useStyles = makeStyles({
  cardAction: {
    textAlign: "left",
    padding: "8px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    height: "100%",
  },
  time: {
    alignSelf: "right",
  },
});

const NoteCard = (note: Note) => {
  const classes = useStyles();
  const setEditing = useSelector(AppState, (state) => state.setEditing);

  const handleClick = () => {
    setEditing(true, note);
  };

  const getDateText = () => {
    return moment(note.time).add(7, "hours").format("ddd, DD MMM kk:mm");
  };

  return (
    // <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card elevation={4}>
      <CardActionArea className={classes.cardAction} onClick={handleClick}>
        <Typography variant="h6">{note.title}</Typography>
        <Divider />
        <Typography variant="body1" style={{ flex: 1, wordBreak: "break-all" }}>
          {note.content.length > 200
            ? note.content.substring(0, 200) + "..."
            : note.content}
        </Typography>
        <Typography variant="caption" style={{ flex: 1 }} color="textSecondary">
          {getDateText()}
        </Typography>
      </CardActionArea>
    </Card>
    // </Grid>
  );
};

export default NoteCard;
