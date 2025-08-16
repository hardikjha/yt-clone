// server/routes/users.js
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// ===== REGISTER =====
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;
    console.log("Register request body:", req.body);

    // Check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      userId: crypto.randomUUID?.() || Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      avatar: avatar || "https://example.com/default-avatar.png",
      channels: [],
    });

    await newUser.save();
    console.log("User saved to DB:", newUser);

    // Sign JWT
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ user: newUser, token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===== LOGIN =====
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request body:", req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
