const express = require("express");
const MongoClient = require("mongodb").MongoClient;

mongoose = require("mongoose");
const app = express();
app.use(express.json());

async function saveResponseToMongoDB(dataJson) {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
  });
  const db = client.db("CRUD");
  try {
    const result = await db.collection("dataJson").insertOne(dataJson);
    console.log(`Saved response with ID: ${result.insertedId}`);
  } catch (err) {
    console.error(`Error saving response: ${err}`);
  } finally {
    client.close();
  }
}

app.post("/post", (req, res) => {
  console.log(req.body, "req.body");
  let dataJson = JSON.parse(JSON.stringify(req.body));
  console.log(dataJson, "dataJson");
  saveResponseToMongoDB(dataJson);
  res.status(200).json(dataJson);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
