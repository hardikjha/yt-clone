import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateChannelPage() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/api/channels/create", {
        userId: user.userId,
        name: channelName,
        description,
      });

      alert(`Channel "${data.channel.name}" created successfully!`);
      navigate(`/channel/${data.channel.channelId}`);
    } catch (err) {
      console.error(err);
      alert("Error creating channel");
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <main className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Create a Channel</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
            className="border border-gray-300 p-4 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            placeholder="Channel Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-4 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px]"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Channel
          </button>
        </form>
      </main>
    </div>
  );
}
