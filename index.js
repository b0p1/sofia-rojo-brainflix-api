const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const port = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());
app.use('/images',express.static("images"));

app.get("/", (_req, res) => {
  res.send("Hello BrainFlix");
});

app.get("/videos", (_req, res) => {
  const videos = getVideos();
  console.log(videos);
  res.send(videos);
});

app.get("/videos/:id", (req, res) => {
  const videos = getVideos();
  const video = videos.find((item) => item.id === req.params.id);
  res.send(video);
});

app.post("/videos", (req, res) => {
  const {
    title,
    channel,
    image,
    description,
    views,
    likes,
    duration,
    timestamp,
    comments,
  } = req.body;
  const newVideo = {
    id: uuidv4(),
    title,
    channel,
    image,
    description,
    views: 0,
    likes: 0,
    timestamp: new Date().valueOf(),
    comments: [],
  };
  const videoData = [...videos, newVideo];
  // console.log(newVideo)
  // fs.writeFileSync('./data/video-details.json', JSON.stringify(videoData))
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

function getVideos() {
  const videosFile = fs.readFileSync("./data/video-details.json");
  const videos = JSON.parse(videosFile);
  return videos;
}
