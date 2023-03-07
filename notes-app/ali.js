import express from "express";
import { loadNotes } from "./notes.js";
// import notes from "./notes
const app = express();

app.get("/getNotes", async function (req, res) {
  let notes = await loadNotes();
  notes.map((e) => {
    e.title, e.body;
  });
  res.status(200).send(notes);
});

app.listen(3006);
