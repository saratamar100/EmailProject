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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await dbo.collection("users").findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({
      message: "Login successful",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { email, firstName, lastName } = req.body;
  const newUser = {
    email,
    firstName,
    lastName,
  };

  try {
    const existingUser = await dbo.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email address already exists" });
    }
    await dbo.collection("users").insertOne(newUser);
    res.json({
      message: "the user was added succsessfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

module.exports = router;
