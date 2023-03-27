const express = require("express");
const MongoClient = require("mongodb").MongoClient;

mongoose = require("mongoose");
const app = express();
app.use(express.json());

async function getResponseToMongoDB() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
  });
  const db = client.db("CRUD");
  try {
    const result = await db.collection("dataJson").find({});
    const users = [];
    await result.forEach((doc) => {
      users.push(doc);
    });
    return users;
  } catch (err) {
    console.error(`Error saving response: ${err}`);
  } finally {
    client.close();
  }
}

app.get("/get", async (req, res) => {
  const users = await getResponseToMongoDB();
  res.status(200).json(users);
});

app.listen(3008, () => {
  console.log("Server is running on port 3008");
});
