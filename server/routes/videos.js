import express from "express";
import Video from "../models/Video.js";

const router = express.Router();

// GET all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find(); // fetch all
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

export default router;
