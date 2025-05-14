const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
let dbo;

client.connect().then(() => {
  dbo = client.db("email");
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});

router.get("/", async (req, res) => {
  try {
    const query = { name: "sara" };
    const users = await dbo.collection("users").find(query).toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

module.exports = router;
