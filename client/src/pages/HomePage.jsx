import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

export default function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/videos") // backend route
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {videos.map((v) => (
        <VideoCard key={v._id} {...v} />
      ))}
    </div>
  );
}
