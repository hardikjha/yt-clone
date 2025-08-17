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
      navigate("/"); // redirect after creation
    } catch (err) {
      console.error(err);
      alert("Error creating channel");
    }
  };

  if (!user) return null; // prevent rendering form before redirect

  return (
    <div className="mt-20 max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Channel</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Channel Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
}
