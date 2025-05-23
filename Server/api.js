const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const apiEmailsRouter = require("./routers/emails");
app.use("/emails", apiEmailsRouter);
const apiDraftsRouter = require("./routers/drafts");
app.use("/drafts", apiDraftsRouter);
const apiUsersRouter = require("./routers/users");
app.use("/users", apiUsersRouter);

app.get("/", (req, res) => {
  console.log("Request received!");
  res.send("Connected to the database and server");
});

app.listen(3001, () => {
  console.log("App listening on port 3001.");
});
