const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
let dbo;

client
  .connect()
  .then(() => {
    dbo = client.db("email");
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

router.get("/inbox/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const query = { receiver: email };
    const emails = await dbo.collection("emails").find(query).toArray();
    const emailsData = await Promise.all(
      emails.map(async (e) => {
        const user = await dbo.collection("users").findOne({ email: e.sender });
        console.log(e.sender);
        console.log(user);
        return {
          id: e._id,
          sender: e.sender,
          subject: e.subject,
          body: e.body,
          firstName: user ? user.firstName : "",
          lastName: user ? user.lastName : "",
          time: e.time,
        };
      })
    );
    res.json(emailsData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { sender, receiver, subject, body } = req.body;
  const newEmail = {
    sender,
    receiver,
    subject,
    body,
    time: new Date(),
  };

  try {
    const result = await dbo.collection("emails").insertOne(newEmail);
    res.json({
      message: "the email was sent succsessfully",
      emailId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

module.exports = router;
