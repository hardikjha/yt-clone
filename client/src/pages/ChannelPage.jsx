import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ChannelPage() {
  const { channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) navigate("/auth");

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/channels/${channelId}`
        );

        // Add dummy videos if none exist
        if (!data.videos || data.videos.length === 0) {
          data.videos = Array.from({ length: 4 }, (_, i) => ({
            videoId: `dummy${i + 1}`,
            title: `Dummy Video ${i + 1}`,
            thumbnailUrl: `https://picsum.photos/seed/dummy${i + 1}/300/180`,
            views: Math.floor(Math.random() * 1000),
            duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(
              Math.random() * 60
            )
              .toString()
              .padStart(2, "0")}`,
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
    <div className="flex flex-col min-h-screen">
      {/* Channel Header */}
      <div className="relative w-full h-60 bg-gray-200">
        {/* Random cover photo */}
        <img
          src={`/projectbg.jpg`}
          alt="cover"
          className="w-full h-full object-cover"
        />

        {/* Avatar + channel name */}
        <div className="absolute left-8 bottom-[-40px] flex items-center gap-4">
          <img
            src={user.avatar || "https://via.placeholder.com/80"}
            alt="channel avatar"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{channel.name}</h1>
            <p className="text-gray-600">{channel.description}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 mt-20">
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {channel.videos.map((video) => (
            <div
              key={video.videoId}
              className="border rounded overflow-hidden relative"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-2 flex justify-between items-center">
                <h3 className="font-medium text-sm">{video.title}</h3>
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
              <div className="px-2 pb-2 text-xs text-gray-600 flex justify-between">
                <span>{video.views} views</span>
                <span>{video.duration || "3:45"}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
