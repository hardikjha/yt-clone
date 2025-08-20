import { Link } from "react-router-dom";

export default function VideoCard({ videoId, title, uploader, views, thumbnailUrl, duration }) {
  return (
    <Link to={`/video/${videoId}`} className="block">
      <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
        {/* Thumbnail with fixed 16:9 aspect ratio */}
        <div className="relative w-full aspect-video">
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/300/180?random=1";
            }}
          />
          {/* Duration badge */}
          {duration && (
            <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1.5 py-0.5 rounded-sm opacity-90">
              {duration}
            </span>
          )}
        </div>

        <div className="p-3">
          <h3 className="text-sm font-semibold line-clamp-2">
            {title || "Untitled Video"}
          </h3>
          <p className="text-xs text-gray-500">{uploader || "Unknown Uploader"}</p>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{typeof views === "number" ? views.toLocaleString() : "0"} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
