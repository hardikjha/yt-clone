import express from "express";
import Video from "../models/Video.js";

const router = express.Router();

// Get all videos (for homepage)
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single video by ID
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like video
router.put("/:id/like", async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.likes += 1;
    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dislike video
router.put("/:id/dislike", async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.dislikes += 1;
    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add comment
router.post("/:id/comments", async (req, res) => {
  try {
    const { userId, text } = req.body;
    const video = await Video.findOne({ videoId: req.params.id });
    if (!video) return res.status(404).json({ message: "Video not found" });

    const newComment = {
      commentId: `cmt${Date.now()}`,
      userId,
      text,
      timestamp: new Date()
    };

    video.comments.push(newComment);
    await video.save();
    res.json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
