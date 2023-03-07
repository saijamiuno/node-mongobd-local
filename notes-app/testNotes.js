// import express from "express";
const { MongoClient } = require('mongodb');
// import fs from "fs";
// // import bodyParser from "body-parser";
// const app = express();
// // const router = express.Router();

// // app.use('/', express.static(__dirname));
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json()); // support json encoded bodies
// // app.use(express.json());

// app.use(function (req, res, next) {
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.append("Access-Control-Allow-Headers", "Content-Type");
//   res.append("Access-Control-Allow-Credentials", true);
//   next();
// });

// app.get("/get", async function (req, res) {
//   const dataBuffer = fs.readFileSync("notes.json");
//   const dataJson = dataBuffer.toString();
//   const data = JSON.parse(dataJson);
//   res.status(200).send(data);
// });

// app.post('/yo', (req, res) => {
//   console.log(req.body);
//   const data = JSON.parse(req.body);
//   console.log(data);
//   res.status(200).send(data);
// });

// app.listen(3006, () => {
//   console.log("Server is running on port 3006");
// });

// export default app;

const express = require("express");
const app = express();

app.use(express.json());

app.post("/post", (req, res) => {
  console.log(req.body);
  let dataJson = JSON.parse(JSON.stringify(req.body))
  
  console.log(dataJson);
  res.status(200).json(dataJson);
});


// Connection URI
const uri = 'mongodb://localhost:27017';
// Database Name
const dbName = 'mydb';

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Connect to the MongoDB server










app.listen(3006, () => {
  console.log("Server is running on port 3006");
});
