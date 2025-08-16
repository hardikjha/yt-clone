export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`
        fixed top-[56px] left-0 h-[calc(100vh-56px)] w-60 bg-white shadow-md transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <ul className="p-4 space-y-4">
        <li className="hover:bg-gray-100 p-2 rounded">Home</li>
        <li className="hover:bg-gray-100 p-2 rounded">Trending</li>
        <li className="hover:bg-gray-100 p-2 rounded">Subscriptions</li>
        <li className="hover:bg-gray-100 p-2 rounded">Library</li>
      </ul>
    </aside>
  );
}
