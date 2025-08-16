// server/routes/users.js
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // Create user (password will be hashed automatically)
    const newUser = new User({
      userId: Date.now().toString(),
      username,
      email,
      password,
      avatar,
      channels: [],
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      user: {
        userId: newUser.userId,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        channels: newUser.channels,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        channels: user.channels,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
