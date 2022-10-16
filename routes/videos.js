const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get("/", (_req, res) => {
  const videos = getVideos();
  res.send(videos);
});

router.get("/:id", (req, res) => {
  const videos = getVideos();
  const video = videos.find((item) => item.id === req.params.id);
  res.send(video);
});

router.post("/", (req, res) => {
  const videos = getVideos();
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
    channel: "Quirky Goat",
    image: "grey-image.jpeg",
    description,
    views: 0,
    likes: 0,
    timestamp: new Date().valueOf(),
    comments: [],
  };
  const videoData = [...videos, newVideo];

  fs.writeFileSync("./data/video-details.json", JSON.stringify(videoData));
  res.sendStatus(201);
});

function getVideos() {
  const videosFile = fs.readFileSync("./data/video-details.json");
  const videos = JSON.parse(videosFile);
  return videos;
}

module.exports = router;
