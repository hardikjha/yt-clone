import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import dotenv from "dotenv";

import videoRoutes from "./routes/videos.js";

dotenv.config();

const app = express();
const PORT = 5000;
const SECRET = "your_jwt_secret";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/youtube_clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected to youtube_clone database");
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// Temporary in-memory user storage
const users = [];

// Test route
app.get("/", (req, res) => {
  res.send("Server running");
});

// Register route
app.post("/register", async (req, res) => {
  const { username, email, password, avatar } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    userId: uuidv4(),
    username,
    email,
    password: hashedPassword,
    avatar: avatar || "https://example.com/default-avatar.png",
    channels: []
  };

  users.push(newUser);

  const token = jwt.sign(
    { userId: newUser.userId, username, email },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      userId: newUser.userId,
      username,
      email,
      avatar: newUser.avatar,
      channels: newUser.channels
    }
  });
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.userId, username: user.username, email },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      userId: user.userId,
      username: user.username,
      email,
      avatar: user.avatar,
      channels: user.channels
    }
  });
});

// Video routes
app.use("/api/videos", videoRoutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
