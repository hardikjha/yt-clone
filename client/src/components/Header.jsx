export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <button className="text-xl">&#9776;</button>
        <h1 className="text-xl font-bold text-red-600">YouTube</h1>
      </div>

      {/* Middle: Search */}
      <div className="flex flex-1 max-w-xl mx-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none"
        />
        <button className="bg-gray-100 border border-gray-300 rounded-r-full px-4">
          🔍
        </button>
      </div>

      {/* Right: Sign In */}
      <button className="text-blue-600 border px-4 py-1 rounded-md hover:bg-blue-50">
        Sign In
      </button>
    </header>
  );
}
