import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CategoryFilter from "./CategoryFilter";

export default function HomeLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 mt-14">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-60" : "ml-0"
          }`}
        >
          <CategoryFilter />
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
