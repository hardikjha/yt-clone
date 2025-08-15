import VideoCard from "../components/VideoCard";

export default function HomePage() {
  const videos = [
    { title: "Learn React in 30 Minutes", channel: "Code with John", views: "15K", thumbnail: "https://via.placeholder.com/300x180" },
    { title: "Master JavaScript", channel: "JS Academy", views: "25K", thumbnail: "https://via.placeholder.com/300x180" },
    { title: "Tailwind Tips", channel: "CSS Ninja", views: "9.1K", thumbnail: "https://via.placeholder.com/300x180" },
    { title: "Node Crash Course", channel: "Backend Pro", views: "18K", thumbnail: "https://via.placeholder.com/300x180" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {videos.map((v, i) => (
        <VideoCard key={i} {...v} />
      ))}
    </div>
  );
}
