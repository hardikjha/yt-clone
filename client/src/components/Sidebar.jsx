export default function Sidebar({ isOpen }) {
  const categories = ["All", "Music", "Gaming", "News", "Sports", "Education", "Movies"];

  return (
    <aside
      className={[
        // Common
        "bg-white transition-all duration-300 ease-in-out overflow-y-auto",
        // height below the header (64px)
        "h-[calc(100vh-64px)]",
        // MOBILE: slide over content (above overlay, below header)
        "fixed top-16 left-0 w-60 z-[50] transform",
        isOpen ? "translate-x-0" : "-translate-x-full",
        // DESKTOP: part of layout (push content). Width toggles 0 <-> 15rem
        "md:static md:top-auto md:transform-none md:z-auto",
        isOpen ? "md:w-60 md:border-r md:border-gray-200" : "md:w-0 md:border-0 md:overflow-hidden",
      ].join(" ")}
    >
      <nav className="p-4 space-y-1">
        {categories.map((cat) => (
          <button
            key={cat}
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            {cat}
          </button>
        ))}
      </nav>
    </aside>
  );
}
