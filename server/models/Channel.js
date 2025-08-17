// models/Channel.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const channelSchema = new mongoose.Schema({
  channelId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  ownerId: {
    type: String,
    required: true, // links to user.userId
  },
  videos: [
    {
      videoId: String,
      title: String,
      thumbnailUrl: String,
      views: { type: Number, default: 0 },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
