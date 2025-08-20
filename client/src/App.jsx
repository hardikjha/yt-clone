import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CategoryFilter from "./components/CategoryFilter";
import VideoGrid from "./components/VideoGrid";
import AuthPage from "./pages/AuthPage";
import VideoPage from "./pages/VideoPage";
import SearchPage from "./pages/SearchPage";
import CreateChannelPage from "./pages/CreateChannelPage"; 
import ChannelPage from "./pages/ChannelPage";
import Footer from "./components/Footer";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [videos, setVideos] = useState([]);

  // Function to generate random video duration
  const randomDuration = (minMinutes = 1, maxMinutes = 20) => {
    const totalSeconds =
      Math.floor(Math.random() * (maxMinutes * 60 - minMinutes * 60 + 1)) +
      minMinutes * 60;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        const mappedVideos = data.map((v, i) => ({
          videoId: v.videoId || v._id || `video${i + 1}`,
          title: v.title || "Untitled Video",
          uploader: v.uploader || "Unknown",
          views: typeof v.views === "number" ? v.views : 0,
          thumbnailUrl:
            v.thumbnailUrl ||
            v.thumbnail ||
            `https://picsum.photos/seed/video${i + 1}/300/180`,
          duration: randomDuration(), // <-- add random duration
        }));

        setVideos(mappedVideos);
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  const filteredVideos =
    category === "All"
      ? videos
      : videos.filter((v) =>
          v.title?.toLowerCase().includes(category.toLowerCase())
        );

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/channel/:channelId" element={<ChannelPage />} />
          <Route
            path="/"
            element={
              <div className="flex mt-14 min-h-[calc(100vh-56px)]">
                <Sidebar isOpen={sidebarOpen} />
                <main
                  className={`flex-1 transition-all duration-300 overflow-hidden ${
                    sidebarOpen ? "ml-60" : "ml-0"
                  }`}
                >
                  {/* Horizontally scrollable CategoryFilter */}
                  <CategoryFilter onCategoryChange={setCategory} />

                  <div className="p-4">
                    <VideoGrid videos={filteredVideos} />
                  </div>
                </main>
              </div>
            }
          />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/create-channel" element={<CreateChannelPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
