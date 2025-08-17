// client/src/pages/VideoPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function VideoPage() {
  const { videoId } = useParams(); // get videoId from route params
  const [video, setVideo] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch video data from backend
    axios
      .get(`http://localhost:5000/api/videos/${videoId}`)
      .then((res) => setVideo(res.data))
      .catch((err) => console.error("Error fetching video:", err));
  }, [videoId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/videos/${videoId}/comments`,
        { text: newComment, userId: "user01" } // replace with logged-in user
      );
      setVideo(res.data); // update video with new comments
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/videos/${videoId}/comments/${commentId}`
      );
      setVideo(res.data);
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  if (!video) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Video player */}
      <div className="w-full bg-black h-[400px] mb-4 flex items-center justify-center text-white">
        Video Player Placeholder
      </div>

      {/* Video info */}
      <h1 className="text-2xl font-bold mb-1">{video.title}</h1>
      <p className="text-gray-600 mb-2">Uploaded by: {video.uploader}</p>
      <p className="text-gray-500 mb-2">{video.views.toLocaleString()} views</p>

      {/* Likes / Dislikes */}
      <div className="flex gap-4 mb-4">
        <button className="px-3 py-1 bg-blue-600 text-white rounded">
          👍 {video.likes.toLocaleString()}
        </button>
        <button className="px-3 py-1 bg-red-600 text-white rounded">
          👎 {video.dislikes.toLocaleString()}
        </button>
      </div>

      {/* Description */}
      <p className="mb-4">{video.description}</p>

      {/* Comments */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <div className="flex mb-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 p-2 border rounded mr-2"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Comment
          </button>
        </div>
        {video.comments.map((c) => (
          <div
            key={c.commentId}
            className="flex justify-between items-center mb-2 p-2 border rounded"
          >
            <div>
              <p className="font-semibold">{c.userId}</p>
              <p>{c.text}</p>
              <p className="text-xs text-gray-400">{c.timestamp}</p>
            </div>
            <button
              onClick={() => handleDeleteComment(c.commentId)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
