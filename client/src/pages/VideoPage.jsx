import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import VideoCard from "../components/VideoCard";

export default function VideoPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Fetch main video
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

  // Fetch suggested videos
  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/videos");
        setSuggestedVideos(data.filter((v) => v.videoId !== videoId));
      } catch (err) {
        console.error(err);
      }
    };
    fetchSuggested();
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
    <div className="flex gap-8 mt-20 max-w-6xl mx-auto">
      {/* Left column: main video */}
      <div className="w-3/4 text-left">
        <div className="w-full bg-black mb-2">
          <video
            src={video.videoUrl || video.thumbnailUrl}
            controls
            className="w-full h-96 object-cover"
          />
        </div>

        <p className="text-gray-500">{video.views.toLocaleString()} views</p>
        <h1 className="text-2xl font-bold mt-2">{video.title}</h1>
        <p className="text-gray-600 mt-1">Uploaded by: {video.uploader}</p>

        {/* Likes & Dislikes */}
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
            </div>
          ))}
        </div>
      </div>

      {/* Right column: suggested videos */}
      <div className="w-1/4">
        <h2 className="text-lg font-semibold mb-4">Up Next</h2>
        <div className="flex flex-col gap-4">
          {suggestedVideos.map((vid) => (
            <VideoCard
              key={vid.videoId}
              videoId={vid.videoId}
              title={vid.title}
              uploader={vid.uploader}
              views={vid.views}
              thumbnailUrl={vid.thumbnailUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
