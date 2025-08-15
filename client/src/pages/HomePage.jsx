import VideoCard from "../components/VideoCard";

export default function HomePage() {
  const videos = [
    {
      title: "Learn React in 30 Minutes",
      channel: "Code with John",
      views: "15K",
      thumbnail: "https://via.placeholder.com/300x180",
    },
    {
      title: "Master JavaScript",
      channel: "JS Academy",
      views: "25K",
      thumbnail: "https://via.placeholder.com/300x180",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {videos.map((vid, idx) => (
        <VideoCard key={idx} {...vid} />
      ))}
    </div>
  );
}
