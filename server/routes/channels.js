// routes/channels.js
import express from "express";
import Channel from "../models/Channel.js";
import User from "../models/User.js";

const router = express.Router();

// Create a new channel
router.post("/create", async (req, res) => {
  try {
    const { userId, name, description } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ message: "userId and channel name are required" });
    }

    // Create the channel
    const newChannel = new Channel({
      name,
      description: description || "",
      ownerId: userId,
    });

    await newChannel.save();

    // Update the user's channels array (store only channelId string)
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.channels = user.channels || [];
    user.channels.push(newChannel.channelId); // ✅ only push channelId string
    await user.save();

    res.status(201).json({ message: "Channel created", channel: newChannel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get channel by channelId
router.get("/:channelId", async (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findOne({ channelId });
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.json(channel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get my channel by ownerId
router.get("/mychannel/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const channel = await Channel.findOne({ ownerId: userId });
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.json(channel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
