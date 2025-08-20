import { useEffect, useState } from "react";
import VideoGrid from "../components/VideoGrid";

export default function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  return (
    <div className="w-full mt-20">
      <VideoGrid videos={videos} />
    </div>
  );
}
