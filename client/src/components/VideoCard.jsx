export default function VideoCard({ title, uploader, views, thumbnailUrl }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://picsum.photos/300/180?random=1";
        }}
      />

      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2">{title || "Untitled Video"}</h3>
        <p className="text-xs text-gray-500">{uploader || "Unknown Uploader"}</p>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{typeof views === "number" ? views.toLocaleString() : "0"} views</span>
        </div>
      </div>
    </div>
  );
}
