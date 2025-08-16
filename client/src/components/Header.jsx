import { Menu, Search, Mic } from "lucide-react";
import Tooltip from "./ui/Tooltip";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow flex items-center justify-between px-4 py-2 h-[56px]">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">ViewTube</h1>
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

      {/* Right: Sign In button */}
      <div className="flex items-center gap-4">
        <button className="px-4 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50">
          Sign in
        </button>
      </div>
    </header>
  );
}
