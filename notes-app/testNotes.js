import express from "express";
import fs from "fs";
const app = express();

app.get("/testingNotesApp", async function (req, res) {
  const dataBuffer = fs.readFileSync("notes.json");
  const dataJson = dataBuffer.toString();
  const data = JSON.parse(dataJson);
  res.status(200).send(data);
});

app.listen(3006);
