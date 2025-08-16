import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CategoryFilter from "./components/CategoryFilter";
import VideoGrid from "./components/VideoGrid";
import AuthPage from "./pages/AuthPage";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [videos, setVideos] = useState([]);

  // Fetch videos from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((data) => {
        // Map backend fields to match VideoCard props
        const mappedVideos = data.map((v) => ({
          title: v.title,
          uploader: v.uploader,
          views: v.views,
          thumbnailUrl: v.thumbnailUrl,
        }));
        setVideos(mappedVideos);
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  // Apply category filter
  const filteredVideos =
    category === "All"
      ? videos
      : videos.filter((v) =>
          v.title?.toLowerCase().includes(category.toLowerCase())
        );

  return (
    <Router>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/"
          element={
            <div className="flex mt-14 min-h-[calc(100vh-56px)]">
              <Sidebar isOpen={sidebarOpen} />

              <main
                className={`flex-1 transition-all duration-300 ${
                  sidebarOpen ? "ml-60" : "ml-0"
                }`}
              >
                <CategoryFilter onCategoryChange={setCategory} />
                <div className="p-4">
                  <VideoGrid videos={filteredVideos || []} />
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
