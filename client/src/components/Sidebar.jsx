export default function Sidebar({ isOpen }) {
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
    <aside
      className={`bg-white border-r p-4 fixed top-0 left-0 h-full w-60 transform transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
    >
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
