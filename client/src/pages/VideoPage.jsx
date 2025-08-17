import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import VideoCard from "../components/VideoCard";
import VideoLayout from "../components/VideoLayout";

export default function VideoPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [userReaction, setUserReaction] = useState(null);

  // Fetch video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/videos/${videoId}`
        );
        setVideo(data);

        if (user) {
          const liked = data.likedBy?.includes(user.userId);
          const disliked = data.dislikedBy?.includes(user.userId);
          setUserReaction(liked ? "like" : disliked ? "dislike" : null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideo();
  }, [videoId, user]);

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

  // Like handlers
  const handleLike = async () => {
    if (!user) return alert("Please login to like the video");
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/videos/${videoId}/like`,
        { userId: user.userId }
      );
      setVideo(data);
      setUserReaction(data.likedBy.includes(user.userId) ? "like" : null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (!user) return alert("Please login to dislike the video");
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/videos/${videoId}/dislike`,
        { userId: user.userId }
      );
      setVideo(data);
      setUserReaction(data.dislikedBy.includes(user.userId) ? "dislike" : null);
    } catch (err) {
      console.error(err);
    }
  };

  // Comments
  const handleAddComment = async () => {
    if (!user) return alert("Please login to comment");
    if (!commentText.trim()) return;
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/videos/${videoId}/comments`,
        { userId: user.userId, text: commentText }
      );
      setVideo((prev) => ({ ...prev, comments: [...prev.comments, data] }));
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editingText.trim()) return;
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/videos/${videoId}/comments/${commentId}`,
        { text: editingText }
      );
      setVideo((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c.commentId === commentId ? data : c
        ),
      }));
      setEditingCommentId(null);
      setEditingText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/videos/${videoId}/comments/${commentId}`
      );
      setVideo((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c.commentId !== commentId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (!video) return <p className="p-4">Loading...</p>;

  return (
    <VideoLayout>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left column */}
        <div className="flex-1 text-left">
          <div className="w-full bg-black mb-4">
            <video
              src="/dummy-video.mp4"
              controls
              autoPlay
              className="w-full h-60 sm:h-80 lg:h-96 object-contain rounded"
            />
          </div>

          <p className="text-gray-500">{video.views.toLocaleString()} views</p>
          <h1 className="text-2xl font-bold mt-2">{video.title}</h1>
          <p className="text-gray-600 mt-1">Uploaded by: {video.uploader}</p>

          <div className="flex gap-4 mt-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-3 py-1 rounded 
                ${
                  userReaction === "like"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              <ThumbsUp size={18} /> {video.likes}
            </button>
            <button
              onClick={handleDislike}
              className={`flex items-center gap-1 px-3 py-1 rounded 
                ${
                  userReaction === "dislike"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              <ThumbsDown size={18} /> {video.dislikes}
            </button>
          </div>

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
              <div
                key={c.commentId}
                className="mb-2 border-b pb-2 flex flex-col"
              >
                {editingCommentId === c.commentId ? (
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 border rounded p-2"
                    />
                    <button
                      onClick={() => handleUpdateComment(c.commentId)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-800">{c.text}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(c.timestamp).toLocaleString()}
                    </p>
                    {user && user.userId === c.userId && (
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => {
                            setEditingCommentId(c.commentId);
                            setEditingText(c.text);
                          }}
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(c.commentId)}
                          className="text-red-600 text-sm hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Suggestions below comments on small screens */}
          <div className="lg:hidden mt-8">
            <h2 className="text-lg font-semibold mb-4">Suggested Videos</h2>
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

        {/* Right column for large screens */}
        <div className="hidden lg:block w-1/4">
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
    </VideoLayout>
  );
}
