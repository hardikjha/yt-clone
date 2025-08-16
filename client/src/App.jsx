import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(v => !v);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed header - always on top */}
      <Header onMenuClick={toggleSidebar} />

      {/* Content under header */}
      <div className="pt-16 flex relative">
        {/* Sidebar (mobile = fixed overlay; desktop = layout column) */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Mobile overlay: under header, above content; clicks close the sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed left-0 right-0 bottom-0 top-16 bg-black/50 z-[40] md:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Main content fills remaining space; desktop push happens as sidebar width changes */}
        <main className="flex-1 p-4">
          <HomePage />
        </main>
      </div>
    </div>
  );
}
