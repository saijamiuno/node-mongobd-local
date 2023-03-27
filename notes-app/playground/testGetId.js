const express = require("express");
const MongoClient = require("mongodb").MongoClient;

mongoose = require("mongoose");
const app = express();
app.use(express.json());
var ObjectId = require('mongodb').ObjectId;

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
    console.log(res,"response");
    res.status(200).json(user);
  });

  app.listen(3009, () => {
    console.log("Server is running on port 3009");
  });