import { useNavigate } from "react-router-dom";
import {
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  History,
  ListVideo,
  Music,
  Gamepad2,
  Newspaper,
  PlusCircle,
} from "lucide-react";

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const sections = [
    {
      title: null,
      items: [
        { label: "Home", icon: <Home size={20} />, path: "/" },
        { label: "Explore", icon: <Compass size={20} />, path: "/explore" },
        { label: "Subscriptions", icon: <ListVideo size={20} />, path: "/subscriptions" },
      ],
    },
    {
      title: "Library",
      items: [
        { label: "History", icon: <History size={20} />, path: "/history" },
        { label: "Watch Later", icon: <Clock size={20} />, path: "/watch-later" },
        { label: "Liked Videos", icon: <ThumbsUp size={20} />, path: "/liked" },
      ],
    },
    {
      title: "Explore More",
      items: [
        { label: "Music", icon: <Music size={20} />, path: "/music" },
        { label: "Gaming", icon: <Gamepad2 size={20} />, path: "/gaming" },
        { label: "News", icon: <Newspaper size={20} />, path: "/news" },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-14 left-0 h-full bg-white shadow-lg border-r
        w-60 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="px-4 py-3 overflow-y-auto h-full">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {section.title && (
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                {section.title}
              </h4>
            )}
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  onClick={() => item.path && navigate(item.path)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm font-medium"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Create Channel button (only for logged in users) */}
        {user && (
          <div className="mt-4">
            <button
              onClick={() => navigate("/create-channel")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 w-full text-sm font-medium"
            >
              <PlusCircle size={20} />
              <span>Create Channel</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
