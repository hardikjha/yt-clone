import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VideoPage() {
  const { id } = useParams(); // videoId from URL
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch video + comments
  useEffect(() => {
    const fetchData = async () => {
      const videoRes = await axios.get(`/api/videos/${id}`);
      setVideo(videoRes.data);

      const commentsRes = await axios.get(`/api/comments/${id}`);
      setComments(commentsRes.data);
    };
    fetchData();
  }, [id]);

  // Add comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const res = await axios.post("/api/comments", {
      videoId: id,
      text: newComment,
    }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    setComments([...comments, res.data]);
    setNewComment("");
  };

  // Edit comment
  const handleEditComment = async (commentId, updatedText) => {
    const res = await axios.put(`/api/comments/${commentId}`, {
      text: updatedText
    }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

    setComments(comments.map(c => c._id === commentId ? res.data : c));
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    await axios.delete(`/api/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setComments(comments.filter(c => c._id !== commentId));
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Video Player */}
      <div className="w-full max-w-4xl mx-auto">
        <video src={video?.url} controls className="w-full rounded-lg" />
        <h1 className="text-2xl font-bold mt-4">{video?.title}</h1>
        <p className="text-gray-600">{video?.description}</p>
        <p className="font-semibold mt-2">Channel: {video?.channelName}</p>
      </div>

      {/* Comments */}
      <div className="mt-6 max-w-3xl mx-auto w-full">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        
        {/* Add Comment */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Post
          </button>
        </div>

        {/* Comment List */}
        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c._id} className="border-b pb-2">
              <div className="flex items-center justify-between">
                <p><strong>{c.userId?.username}</strong>: {c.text}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const updated = prompt("Edit comment:", c.text);
                      if (updated) handleEditComment(c._id, updated);
                    }}
                    className="text-sm text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(c._id)}
                    className="text-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
