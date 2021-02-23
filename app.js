const express = require("express");
const path = require("path");
const userRoute = require("./routes/userRoute.js");
const notesRoute = require("./routes/noteRoute.js");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/user", userRoute);
app.use("/note", notesRoute);
app.use(express.static(path.join(__dirname, "client", "build")));
app.use((_, res, __) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
