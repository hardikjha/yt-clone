import { Menu, Search, Mic } from "lucide-react";
import Tooltip from "./ui/Tooltip";
import { useNavigate, useLocation } from "react-router-dom";
import LogoImg from "../img/logo.png";

export default function Header({ onToggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const defaultAvatar = "https://example.com/default-avatar.png";
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow flex items-center justify-between px-4 py-2 h-[56px]">
      {/* Left: Hamburger + Logo / YouTube text */}
      <div className="flex items-center gap-2">
        {/* Hamburger only on homepage */}
        {location.pathname === "/" && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        )}

        {/* Logo / YouTube text */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={LogoImg} alt="Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold text-red-600 select-none">
            YouTube
          </span>
        </div>
      </div>


      {/* Middle: Search + Mic */}
      <div className="flex items-center flex-1 max-w-xl mx-6">
        <div className="flex flex-1 border rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 px-4 py-2 outline-none"
          />
          <button className="bg-gray-100 px-4 flex items-center justify-center">
            <Search size={20} />
          </button>
        </div>
        <Tooltip text="Search with your voice">
          <button className="ml-3 p-2 rounded-full hover:bg-gray-100">
            <Mic size={22} />
          </button>
        </Tooltip>
      </div>

      {/* Right: Sign In button or user info */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2">
            <img
              src={user.avatar || defaultAvatar}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">{user.username}</span>
            <button
              onClick={handleSignOut}
              className="px-3 py-1 border border-red-500 text-red-500 rounded-full hover:bg-red-50 ml-2"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <a
            href="/auth"
            className="px-4 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50"
          >
            Sign in
          </a>
        )}
      </div>
    </header>
  );
}
