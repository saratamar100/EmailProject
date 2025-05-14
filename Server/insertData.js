const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/";

async function createCollection() {
  try {
    const client = await MongoClient.connect(url);
    const dbo = client.db("email");

    await dbo.createCollection("users");
    console.log("Collection users created");

    await dbo.collection("users").insertMany([
      { name: "sara", email: "sara@gmail.com" },
      { name: "Dana", email: "dana@gmail.com" },
      { name: "Chava", email: "chava@gmail.com" }
    ]);
    console.log("the users inserted");

    client.close();
  } catch (err) {
    console.error("Error creating collection or inserting users:", err);
  }
}

createCollection();
