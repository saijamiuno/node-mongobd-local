import express from "express";
const app = express();

app.post("/testingPost", async (req, res) => {
  const dataJson = req.body;
  const data = JSON.parse(dataJson);
  res.status(200).send(data);
});

app.listen(3008);
