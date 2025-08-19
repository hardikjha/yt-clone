import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import videoRoutes from "./routes/videos.js";
import userRoutes from "./routes/users.js";
import channelsRouter from "./routes/channels.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected to youtube_clone database"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/channels", channelsRouter); 

// Test route
app.get("/", (req, res) => {
  res.send("Server running");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
