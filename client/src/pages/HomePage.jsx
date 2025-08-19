import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

export default function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  return (
    <div className="w-full px-2 sm:px-4 mt-20">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-4
          max-w-full
        "
      >
        {videos.map((v) => (
          <VideoCard key={v._id} {...v} />
        ))}
      </div>
    </div>
  );
}
