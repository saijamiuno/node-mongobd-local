const express = require("express");
mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");

const app = express();
app.use(express.json());

const url = "mongodb://127.0.0.1:27017/";
const dbName = "CRUD";

const query = {
  _id: "6405e1019f98a127e6e3f837",
};

app.post("/post", (req, res) => {
  console.log(req.body);
  let dataJson = JSON.parse(JSON.stringify(req.body));
  console.log(dataJson);
  saveResponseToMongoDB(dataJson);
  res.status(200).json(dataJson);

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
});

app.get("/get", (req, res) => {
  res.status(200).send(getDocument());

  async function getDocument(CRUD, query) {
    const client = await db.dataJson.find({
      _id: "6405e1019f98a127e6e3f837",
    });
    const db = client.db(dbName);
    const collection = db.collection("dataJson");
    const documents = await collection.find(query).toArray();
    // client.close();

    return documents;
  }
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});
