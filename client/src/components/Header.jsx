import { Search } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-[100]">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="text-2xl leading-none"
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
          >
            &#9776;
          </button>
          <h1 className="text-xl font-bold text-red-600">YouTube</h1>
        </div>

        {/* Middle: Search */}
        <div className="flex flex-1 max-w-xl mx-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none"
          />
          <button className="bg-gray-100 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Right: Sign In */}
        <button className="text-blue-600 border px-4 py-1 rounded-md hover:bg-blue-50">
          Sign In
        </button>
      </div>
    </header>
  );
}
