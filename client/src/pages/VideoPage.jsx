import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function VideoPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/videos/${videoId}`
        );
        setVideo(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideo();
  }, [videoId]);

  const handleLike = async () => {
    if (!user) return alert("Please login to like the video");
    try {
      await axios.post(`http://localhost:5000/api/videos/${videoId}/like`, {
        userId: user.userId,
      });
      setVideo((prev) => ({ ...prev, likes: prev.likes + 1 }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (!user) return alert("Please login to dislike the video");
    try {
      await axios.post(`http://localhost:5000/api/videos/${videoId}/dislike`, {
        userId: user.userId,
      });
      setVideo((prev) => ({ ...prev, dislikes: prev.dislikes + 1 }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async () => {
    if (!user) return alert("Please login to comment");
    if (!commentText.trim()) return;

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/videos/${videoId}/comments`,
        {
          userId: user.userId,
          text: commentText,
        }
      );
      setVideo((prev) => ({
        ...prev,
        comments: [...prev.comments, data],
      }));
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!video) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto mt-14">
      {/* Video player */}
      <div className="w-full bg-black">
        <video
          src={video.videoUrl || video.thumbnailUrl} // fallback to thumbnail if no video
          controls
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Views */}
      <p className="text-gray-500 mt-2">{video.views.toLocaleString()} views</p>

      {/* Video title */}
      <h1 className="text-2xl font-bold mt-2">{video.title}</h1>

      {/* Channel name */}
      <p className="text-gray-600 mt-1">Uploaded by: {video.uploader}</p>

      {/* Likes/Dislikes */}
      <div className="flex gap-4 mt-3">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <ThumbsUp size={18} /> {video.likes}
        </button>
        <button
          onClick={handleDislike}
          className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <ThumbsDown size={18} /> {video.dislikes}
        </button>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700">{video.description}</p>

      {/* Comments */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {user && (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 border rounded p-2"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Comment
            </button>
          </div>
        )}
        {video.comments.map((c) => (
          <div key={c.commentId} className="mb-2 border-b pb-2">
            <p className="text-sm text-gray-800">{c.text}</p>
            <p className="text-xs text-gray-500">
              {new Date(c.timestamp).toLocaleString()}
            </p>
            {/* TODO: Add edit/delete for own comments */}
          </div>
        ))}
      </div>
    </div>
  );
}
