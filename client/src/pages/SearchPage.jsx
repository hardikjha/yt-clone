import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import VideoLayout from "../components/VideoLayout";

export default function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setVideos([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/videos/search?query=${encodeURIComponent(
            searchQuery
          )}`
        );
        setVideos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
   <div className="flex flex-col min-h-screen">
    <VideoLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">
          Search results for: "{searchQuery}"
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : videos.length === 0 ? (
          <p className="text-gray-500">No videos found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {videos.map((video) => (
              <VideoCard
                key={video.videoId}
                videoId={video.videoId}
                title={video.title}
                uploader={video.uploader}
                views={video.views}
                thumbnailUrl={video.thumbnailUrl}
              />
            ))}
          </div>
        )}
      </div>
    </VideoLayout>
   </div>  
  );
}
