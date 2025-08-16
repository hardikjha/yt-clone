import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CategoryFilter from "./components/CategoryFilter";
import VideoGrid from "./components/VideoGrid";
import sampleVideos from "./data/sampleVideos";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState("All");

  const filteredVideos =
    category === "All"
      ? sampleVideos
      : sampleVideos.filter((v) =>
          v.title.toLowerCase().includes(category.toLowerCase())
        );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header always on top */}
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main Content */}
        <main
          className={`flex-1 mt-14 transition-all duration-300 ${
            sidebarOpen ? "ml-60" : "ml-0"
          }`}
        >
          <CategoryFilter onCategoryChange={setCategory} />
          <div className="p-4">
            <VideoGrid videos={filteredVideos} />
          </div>
        </main>
      </div>
    </div>
  );
}
