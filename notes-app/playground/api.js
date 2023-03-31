const express = require("express");
const { ObjectId } = require("mongodb");
const { connection } = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true });
mongoose = require("mongoose");

const app = express();
app.use(express.json());

async function savetoDb(dataJson) {
  const db = client.db("CRUD");
  try {
    const result = await db.collection("dataJson").insertOne(dataJson);
    console.log(`Saved response with ID: ${result.insertedId}`);
  } catch (err) {
    console.error(`Error : ${err}`);
  } finally {
    client.close();
  }
}

app.post("/addForm", (req, res) => {
  console.log(req.body, "req.body");
  let dataJson = JSON.parse(JSON.stringify(req.body));
  dataJson = dataJson["entityData"]
  console.log(dataJson, "dataJson");
  return
  savetoDb(dataJson);
  res.status(200).json(dataJson);
});

async function getData() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
  });

  const db = client.db("CRUD");
  try {
    const result = await db.collection("dataJson").find({});
    const usersData = [];
    await result.forEach((element) => {
      usersData.push(element);
    });
    return usersData;
  } catch (error) {
    console.log(`Error : ${error}`);
  } finally {
    client.close();
  }
}

app.get("/getUserDetails", async (req, res) => {
  const users = await getData();
  res.status(200).json(users);
});

async function getUserById(id) {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/");
  const db = client.db("CRUD");
  const collection = db.collection("dataJson");
  const user = await collection.findOne({ _id: new ObjectId(id) });
  return user;
}

app.get("/getUserDetails/:id", async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).json(user);
});

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

app.put("/updateUserDetails/:id", async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const success = await updateUserById(id, update);
  if (success) {
    res.json({ message: "User updated successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

async function deleteUserById(id) {
  const connection = await client.connect();
  const db = connection.db("CRUD");
  const collection = db.collection("dataJson");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  connection.close();
  return result.deletedCount > 0;
}

app.delete("/deleteUserDetails/:id", async (req, res) => {
  const id = req.params.id;
  const success = await deleteUserById(id);
  if (success) {
    res.json({ message: "User Deleted Successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
