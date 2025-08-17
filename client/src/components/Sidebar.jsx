import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Home,
  Compass,
  ListVideo,
  History,
  Clock,
  ThumbsUp,
  Music,
  Gamepad2,
  Newspaper,
  PlusCircle,
  Tv,
  TrendingUp,
} from "lucide-react";
import axios from "axios";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) return;
    axios
      .get(`http://localhost:5000/api/users/${localUser.userId}`)
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch(console.error);
  }, []);

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
      title: "Trending & More",
      items: [
        { label: "Trending", icon: <TrendingUp size={20} />, path: "/trending" },
        { label: "Music", icon: <Music size={20} />, path: "/music" },
        { label: "Gaming", icon: <Gamepad2 size={20} />, path: "/gaming" },
        { label: "News", icon: <Newspaper size={20} />, path: "/news" },
      ],
    },
  ];

  return (
    <>
      {/* Overlay for mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-14 left-0 h-full bg-white shadow-lg border-r
          w-64 md:w-60 transform transition-transform duration-300 z-40
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
                    onClick={() => {
                      item.path && navigate(item.path);
                      onClose?.(); // close sidebar on navigation (mobile)
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm font-medium"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Channel buttons */}
          {user && (
            <div className="mt-4">
              {user.channels?.length > 0 ? (
                <button
                  onClick={() => {
                    navigate(`/channel/${user.channels[0].channelId}`);
                    onClose?.();
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 w-full text-sm font-medium"
                >
                  <Tv size={20} />
                  <span>My Channel</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/create-channel");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 w-full text-sm font-medium"
                >
                  <PlusCircle size={20} />
                  <span>Create Channel</span>
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
