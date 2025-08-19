import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // toggle between login/register
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Updated backend URLs
      const url = isLogin
        ? "http://localhost:5000/api/users/login"
        : "http://localhost:5000/api/users/register";

      const body = isLogin
        ? { email, password }
        : { username, email, password, avatar };

      const { data } = await axios.post(url, body);

      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to home page
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-white p-6 rounded shadow-md w-80"
      >
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Avatar URL (optional)"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="p-2 border rounded"
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-3 text-blue-600 underline"
      >
        {isLogin ? "Create an account" : "Already have an account?"}
      </button>
    </div>
  );
}
