export default function VideoCard({ title, channel, views, thumbnail }) {
  return (
    <div className="w-full">
      <img src={thumbnail} alt={title} className="rounded-lg w-full aspect-video object-cover" />
      <div className="mt-2">
        <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-xs">{channel}</p>
        <p className="text-gray-500 text-xs">{views} views</p>
      </div>
    </div>
  );
}
