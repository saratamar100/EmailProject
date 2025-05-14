const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/";

async function createCollection() {
  try {
    const client = await MongoClient.connect(url);
    const dbo = client.db("email");

    await dbo.createCollection("users");
    console.log("Collection users created");

    await dbo.collection("users").insertMany([
      { name: "Sara", email: "sara@gmail.com", password: "sara1" },
      { name: "Dana", email: "dana@gmail.com", password: "dana1" },
      { name: "Chava", email: "chava@gmail.com", password: "chava1" },
    ]);
    console.log("the users inserted");

    await dbo.createCollection("emails");
    console.log("Collection users created");

    await dbo.collection("emails").insertMany([
      {
        sender: "sara@gmail.com",
        receiver: "dana@gmail.com",
        subject: " hi",
        body: "hi dana",
      },
      {
        sender: "sara@gmail.com",
        receiver: "chava@gmail.com",
        subject: " hi",
        body: "hi chava",
      },
      {
        sender: "dana@gmail.com",
        receiver: "sara@gmail.com",
        subject: " hi",
        body: "hi sara",
      },
    ]);
    console.log("the emails inserted");

    await dbo.collection("drafts").insertMany([
      {
        sender: "sara@gmail.com",
        receiver: "dana@gmail.com",
        subject: " hi",
        body: "hi dana",
      },
      {
        sender: "sara@gmail.com",
        receiver: "chava@gmail.com",
        subject: " hi",
        body: "hi chava",
      },
      {
        sender: "dana@gmail.com",
        receiver: "sara@gmail.com",
        subject: " hi",
        body: "hi sara",
      },
    ]);
    console.log("the drafts inserted");

    client.close();
  } catch (err) {
    console.error("Error creating collection or inserting users:", err);
  }
}

createCollection();
