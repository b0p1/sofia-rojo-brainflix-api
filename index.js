const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

app.get("/", (_req, res) => {
  res.send("Hello BrainFlix");
});

// Video routes
const videosRoutes = require("./routes/videos");
app.use("/videos", videosRoutes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
