import { Menu, Search, Mic, X } from "lucide-react";
import Tooltip from "./ui/Tooltip";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import LogoImg from "../img/logo.png";

export default function Header({ onToggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const defaultAvatar = "https://example.com/default-avatar.png";
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
    window.location.reload();
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    setShowMobileSearch(false); // auto close on mobile
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow flex items-center justify-between px-2 sm:px-4 py-2 h-[56px] overflow-hidden">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-2 min-w-0">
        {location.pathname === "/" && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100 flex-shrink-0"
          >
            <Menu size={22} />
          </button>
        )}
        <div
          className="flex items-center gap-1 sm:gap-2 cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <img
            src={LogoImg}
            alt="Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
          <span className="text-lg sm:text-2xl font-bold text-red-600 select-none">
            YouTube
          </span>
        </div>
      </div>

      {/* Middle: Search (desktop only) */}
      <div className="hidden sm:flex items-center flex-1 max-w-full sm:max-w-xl mx-2 sm:mx-6 overflow-hidden">
        <div className="flex flex-1 border rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-3 py-2 outline-none text-sm sm:text-base"
          />
          <button
            onClick={handleSearch}
            className="bg-gray-100 px-4 flex items-center justify-center"
          >
            <Search size={18} />
          </button>
        </div>
        <Tooltip text="Search with your voice">
          <button className="ml-2 p-2 rounded-full hover:bg-gray-100">
            <Mic size={20} />
          </button>
        </Tooltip>
      </div>

      {/* Mobile Search Toggle */}
      <div className="flex sm:hidden items-center">
        <button
          onClick={() => setShowMobileSearch(true)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Right: User / Sign in */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {user ? (
          <div className="flex items-center gap-2">
            <img
              src={user.avatar || defaultAvatar}
              alt="avatar"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
            />
            <span className="hidden sm:inline font-medium">
              {user.username}
            </span>
            <button
              onClick={handleSignOut}
              className="px-2 sm:px-3 py-1 border border-red-500 text-red-500 rounded-full hover:bg-red-50 ml-1 sm:ml-2 text-sm sm:text-base"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <a
            href="/auth"
            className="px-3 sm:px-4 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 text-sm sm:text-base"
          >
            Sign in
          </a>
        )}
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="absolute inset-0 bg-white flex items-center px-3">
          <button
            onClick={() => setShowMobileSearch(false)}
            className="p-2 mr-2 rounded-full hover:bg-gray-100 flex-shrink-0"
          >
            <X size={22} />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
            className="flex-1 px-3 py-2 outline-none text-sm"
          />
          <button
            onClick={handleSearch}
            className="p-2 ml-2 rounded-full hover:bg-gray-100 flex-shrink-0"
          >
            <Search size={20} />
          </button>
        </div>
      )}
    </header>
  );
}
