export default function Sidebar() {
  const categories = [
    "All",
    "Music",
    "Gaming",
    "News",
    "Sports",
    "Education",
    "Movies",
  ];

  return (
    <aside className="w-60 bg-white border-r p-4 hidden md:block">
      {categories.map((cat) => (
        <button
          key={cat}
          className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100"
        >
          {cat}
        </button>
      ))}
    </aside>
  );
}
