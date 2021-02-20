import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import notesRoute from "./routes/noteRoute.js";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/user", userRoute);
app.use("/note", notesRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
