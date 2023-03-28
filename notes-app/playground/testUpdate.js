const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true });
mongoose = require("mongoose");
const app = express();
app.use(express.json());

async function updateUserById(id, update) {
  const connection = await client.connect();
  const db = connection.db("CRUD");
  const collection = db.collection("dataJson");
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: update }
  );
  connection.close();
  return result.modifiedCount > 0;
}

app.put("/getUserDetails/:id", async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const success = await updateUserById(id, update);
  if (success) {
    res.json({ message: "User updated successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(3007, () => {
  console.log("Serever Running on Port 3007");
});
