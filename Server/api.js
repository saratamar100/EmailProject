const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());


const apiEmailsRouter = require("./routers/emails");
app.use("/emails", apiEmailsRouter);

app.get("/", (req, res) => {
  console.log("Request received!");  
  res.send("Connected to the database and server");
});

app.listen(3001, () => {
  console.log("App listening on port 3001.");
});
