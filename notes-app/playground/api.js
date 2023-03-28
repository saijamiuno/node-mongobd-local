const express = require("express");
const { ObjectId } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
mongoose = require("mongoose");

const app = express();
app.use(express.json());

async function savetoDb(dataJson) {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
  });

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
  console.log(dataJson, "dataJson");
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

app.listen(3006, () => {
  console.log("Server Running on Port 3006");
});
