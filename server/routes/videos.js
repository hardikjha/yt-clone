import express from "express";
import Video from "../models/Video.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// ✅ Get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single video by videoId
router.get("/:videoId", async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.videoId });
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a comment
router.post("/:videoId/comments", async (req, res) => {
  try {
    const { userId, text } = req.body;
    const video = await Video.findOne({ videoId: req.params.videoId });
    if (!video) return res.status(404).json({ message: "Video not found" });

    const newComment = {
      commentId: uuidv4(),
      userId,
      text,
      timestamp: new Date(),
    };

    video.comments.push(newComment);
    await video.save();
    res.json(newComment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Edit a comment
router.put("/:videoId/comments/:commentId", async (req, res) => {
  try {
    const { text } = req.body;
    const video = await Video.findOne({ videoId: req.params.videoId });
    if (!video) return res.status(404).json({ message: "Video not found" });

    const comment = video.comments.find(
      (c) => c.commentId === req.params.commentId
    );
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.text = text;
    comment.timestamp = new Date();
    await video.save();

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a comment
router.delete("/:videoId/comments/:commentId", async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.videoId });
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.comments = video.comments.filter(
      (c) => c.commentId !== req.params.commentId
    );
    await video.save();

    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Like a video (toggle)
router.post("/:videoId/like", async (req, res) => {
  try {
    const { userId } = req.body;
    const video = await Video.findOne({ videoId: req.params.videoId });
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.likedBy = video.likedBy || [];
    video.dislikedBy = video.dislikedBy || [];

    if (video.likedBy.includes(userId)) {
      video.likedBy = video.likedBy.filter((id) => id !== userId); // toggle off
    } else {
      video.likedBy.push(userId);
      video.dislikedBy = video.dislikedBy.filter((id) => id !== userId); // remove dislike
    }

    video.likes = video.likedBy.length;
    video.dislikes = video.dislikedBy.length;

    await video.save();
    res.json(video); // send full updated video
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Dislike a video (toggle)
router.post("/:videoId/dislike", async (req, res) => {
  try {
    const { userId } = req.body;
    const video = await Video.findOne({ videoId: req.params.videoId });
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.likedBy = video.likedBy || [];
    video.dislikedBy = video.dislikedBy || [];

    if (video.dislikedBy.includes(userId)) {
      video.dislikedBy = video.dislikedBy.filter((id) => id !== userId); // toggle off
    } else {
      video.dislikedBy.push(userId);
      video.likedBy = video.likedBy.filter((id) => id !== userId); // remove like
    }

    video.likes = video.likedBy.length;
    video.dislikes = video.dislikedBy.length;

    await video.save();
    res.json(video); // send full updated video
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
