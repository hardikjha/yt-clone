import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function VideoLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar onHomeClick={() => navigate("/")} />

      {/* Main content */}
      <main className="flex-1 mt-20 px-4">
        {children}
      </main>
    </div>
  );
}
