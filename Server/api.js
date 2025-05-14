const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());


const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

async function createCollection() {
  try {
    const client = await MongoClient.connect(url);
    const dbo = client.db("email");  
    await dbo.createCollection("users"); 
    console.log("Collection created!");
    client.close();
  } catch (err) {
    console.error(err);
  }
}

createCollection();



app.get("/", (req, res) => {
  console.log("Request received!");  
  res.send("Connected to the database and server");
});

app.listen(3001, () => {
  console.log("App listening on port 3001.");
});
