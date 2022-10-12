const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();
const port = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());

const videos = fs.readFileSync("./data/video-details.json");

app.get("/", (_req, res) => {
  res.send("Hello BrainFlix");
});

app.get("/videos", (_req, res) => {
  const videosJson = JSON.parse(videos);
  console.log(videosJson);
  res.send(videosJson);
});

app.get("/videos/:id", (req, res) => {
  const videosJson = JSON.parse(videos);
  const video = videosJson.find((item) => item.id === req.params.id);
  res.send(video);
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
