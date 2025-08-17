import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  commentId: String,
  userId: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const VideoSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  thumbnailUrl: String,
  description: String,
  channelId: String,
  uploader: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] },      // userIds who liked
  dislikedBy: { type: [String], default: [] },   // userIds who disliked
  uploadDate: { type: Date, default: Date.now },
  comments: [CommentSchema],
});

export default mongoose.model("Video", VideoSchema);
