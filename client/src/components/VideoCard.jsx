export default function VideoCard({ title, channel, views, thumbnail }) {
  return (
    <div className="w-full sm:w-72">
      <img src={thumbnail} alt={title} className="rounded-lg" />
      <div className="mt-2">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-gray-500 text-xs">{channel}</p>
        <p className="text-gray-500 text-xs">{views} views</p>
      </div>
    </div>
  );
}
