import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ChannelPage() {
  const { channelId } = useParams(); // get channelId from URL
  const [channel, setChannel] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) navigate("/auth");

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        // Fetch channel by channelId
        const { data } = await axios.get(
          `http://localhost:5000/api/channels/${channelId}`
        );

        // If no videos yet, add 4 dummy videos
        if (!data.videos || data.videos.length === 0) {
          data.videos = Array.from({ length: 4 }, (_, i) => ({
            videoId: `dummy${i + 1}`,
            title: `Dummy Video ${i + 1}`,
            thumbnailUrl: `https://picsum.photos/seed/dummy${i + 1}/300/180`,
          }));
        }

        setChannel(data);
      } catch (err) {
        console.error(err);
        alert("Could not fetch channel");
      }
    };

    fetchChannel();
  }, [channelId]);

  if (!channel) return <div className="mt-20 text-center">Loading...</div>;

  return (
    <div className="mt-20 max-w-5xl mx-auto px-4">
      <div className="flex items-center mb-4 gap-4">
        <img
          src={`https://picsum.photos/seed/${channel.channelId}/80/80`}
          alt="channel avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <h1 className="text-3xl font-bold">{channel.name}</h1>
      </div>
      <p className="mb-6">{channel.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {channel.videos.map((video) => (
          <div key={video.videoId} className="border rounded overflow-hidden relative">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-2 flex justify-between items-center">
              <h3 className="font-medium text-sm">{video.title}</h3>
              {/* Delete button for dummy videos */}
              <button
                onClick={() => {
                  const filteredVideos = channel.videos.filter(
                    (v) => v.videoId !== video.videoId
                  );
                  setChannel({ ...channel, videos: filteredVideos });
                }}
                className="text-red-500 text-xs hover:underline ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
