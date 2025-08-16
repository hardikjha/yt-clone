import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CategoryFilter from "./components/CategoryFilter";
import VideoGrid from "./components/VideoGrid";
import AuthPage from "./pages/AuthPage";
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
    <Router>
      {/* Header always present */}
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <Routes>
        {/* Login/Register page */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Home page */}
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
                  <VideoGrid videos={filteredVideos} />
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
