export default function VideoCard({ title, channel, views, thumbnail, duration }) {
  return (
    <div className="w-full">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="rounded-lg w-full aspect-video object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x180?text=No+Image";
          }}
        />
        {/* Duration overlay */}
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
          {duration}
        </span>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-xs">{channel}</p>
        <p className="text-gray-500 text-xs">{views} views</p>
      </div>
    </div>
  );
}
