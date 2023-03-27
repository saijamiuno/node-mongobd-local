const express = require("express");
const MongoClient = require("mongodb").MongoClient;

mongoose = require("mongoose");
const app = express();
app.use(express.json());
var ObjectId = require('mongodb').ObjectId;

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

async function getResponseToMongoDB() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
  });
  const db = client.db("CRUD");
  try {
    const result = await db.collection("dataJson").find({});
    const users = [];
    await result.forEach(doc => {
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


app.post("/post", (req, res) => {
  console.log(req.body);
  let dataJson = JSON.parse(JSON.stringify(req.body));
  console.log(dataJson);
  saveResponseToMongoDB(dataJson);
  res.status(200).json(dataJson);
});


async function getUserById(id) {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
  });
  const db = client.db("CRUD");
  const collection = db.collection('dataJson');
  const user = await collection.findOne({ _id: new ObjectId(id) });
  return user;
}

app.get('/get/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).json(user);
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});
