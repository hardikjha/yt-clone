import sampleVideos from "../data/sampleVideos";

export default function VideoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {sampleVideos.map((video) => (
        <div
          key={video.videoId}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
        >
          {/* Thumbnail with 16:9 ratio */}
          <div className="relative aspect-video bg-gray-200">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
              {video.duration}
            </span>
          </div>

          {/* Video details */}
          <div className="p-2">
            <h3 className="font-semibold text-sm line-clamp-2">
              {video.title}
            </h3>
            <p className="text-xs text-gray-500">{video.uploader}</p>
            <p className="text-xs text-gray-500">
              {video.views} views • {new Date(video.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
