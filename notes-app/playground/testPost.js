const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

mongoose = require("mongoose");
const app = express();
app.use(express.json());

const url = "mongodb://127.0.0.1:27017/";
const dbName = "CRUD";

async function getDocument(query) {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("dataJson");

  const document = await collection.findOne(query);

  client.close();

  return document;
}

async function saveResponseToMongoDB(dataJson) {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
  });
  const db = client.db("mongodbVSCodePlaygroundDB");

  try {
    const result = await db.collection("dataJson").insertOne(dataJson);
    console.log(`Saved response with ID: ${result.insertedId}`);
  } catch (err) {
    console.error(`Error saving response: ${err}`);
  } finally {
    client.close();
  }
}

app.post("/testDb", (req, res) => {
  console.log(req.body);
  let dataJson = JSON.parse(JSON.stringify(req.body));
  console.log(dataJson);
  saveResponseToMongoDB(dataJson);
  res.status(200).json(dataJson);
});

// app.get("/get", () => {
//   const result = db.collection("dataJson").find();
//   console.log({ result: result });

// });

app.get("/get",(req,res)  => {
  getDocument("6405e1019f98a127e6e3f837")
  
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});

// Connection URL and database name

// Function to retrieve a document from a collection
