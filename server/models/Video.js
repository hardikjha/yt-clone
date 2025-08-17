import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  commentId: String,
  userId: String,
  text: String,
  timestamp: Date,
});

const VideoSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  thumbnailUrl: String,
  description: String,
  channelId: String,
  uploader: String,
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: Date,
  comments: [CommentSchema],
});

export default mongoose.model("Video", VideoSchema);
