import VideoCard from "./VideoCard";

export default function VideoGrid({ videos = [] }) {
  if (!Array.isArray(videos) || videos.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No videos found</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-2 sm:px-4">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-4
          w-full
        "
      >
        {videos.map((video, i) => {
          if (!video || typeof video !== "object") return null;

          const videoProps = {
            videoId: video.videoId,
            title: video.title || "Untitled Video",
            uploader: video.uploader || video.channel || "Unknown",
            views: video.views || 0,
            thumbnailUrl:
              video.thumbnailUrl ||
              video.thumbnail ||
              "https://via.placeholder.com/300x180?text=No+Thumbnail",
          };

          return <VideoCard key={video.videoId || i} {...videoProps} />;
        })}
      </div>
    </div>
  );
}
