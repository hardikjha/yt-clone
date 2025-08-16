import VideoCard from "../components/VideoCard";

export default function HomePage() {
  const videos = [
    {
      title: "Learn React in 30 Minutes",
      channel: "Code with John",
      views: "15K",
      duration: "12:34",
      thumbnail: "https://picsum.photos/seed/201/300/180",
    },
    {
      title: "Master JavaScript Fast",
      channel: "JS Academy",
      views: "25K",
      duration: "8:45",
      thumbnail: "https://picsum.photos/seed/202/300/180",
    },
    {
      title: "Tailwind CSS Tips & Tricks",
      channel: "CSS Ninja",
      views: "9.1K",
      duration: "15:20",
      thumbnail: "https://picsum.photos/seed/203/300/180",
    },
    {
      title: "Node.js Crash Course",
      channel: "Backend Pro",
      views: "18K",
      duration: "22:10",
      thumbnail: "https://picsum.photos/seed/204/300/180",
    },
    {
      title: "MongoDB Basics Tutorial",
      channel: "Data Dev",
      views: "12K",
      duration: "5:55",
      thumbnail: "https://picsum.photos/seed/205/300/180",
    },
    {
      title: "Frontend Developer Roadmap",
      channel: "DevPath",
      views: "30K",
      duration: "18:02",
      thumbnail: "https://picsum.photos/seed/206/300/180",
    },
    {
      title: "Async JS Explained",
      channel: "Code Simplified",
      views: "7.8K",
      duration: "9:40",
      thumbnail: "https://picsum.photos/seed/207/300/180",
    },
    {
      title: "Build a MERN App",
      channel: "FullStack Bros",
      views: "22K",
      duration: "28:15",
      thumbnail: "https://picsum.photos/seed/208/300/180",
    },
    {
      title: "Learn Git & GitHub",
      channel: "CodeOps",
      views: "11K",
      duration: "7:12",
      thumbnail: "https://picsum.photos/seed/209/300/180",
    },
    {
      title: "TypeScript for Beginners",
      channel: "TS World",
      views: "14K",
      duration: "19:30",
      thumbnail: "https://picsum.photos/seed/210/300/180",
    },
    {
      title: "10 VSCode Extensions",
      channel: "Dev Hacks",
      views: "19K",
      duration: "6:27",
      thumbnail: "https://picsum.photos/seed/211/300/180",
    },
    {
      title: "React vs Angular vs Vue",
      channel: "Frontend Wars",
      views: "40K",
      duration: "13:59",
      thumbnail: "https://picsum.photos/seed/212/300/180",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {videos.map((v, i) => (
        <VideoCard key={i} {...v} />
      ))}
    </div>
  );
}
