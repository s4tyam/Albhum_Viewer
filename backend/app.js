const express = require("express");
const app = express();
require("dotenv").config();
const cookie_parser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const fetch = require("node-fetch")

const connectDB = require("./db");
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookie_parser());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>Nice working</h1>");
});

app.get("/get-token", async (req, res) => {
  console.log("CLIENT_ID:", process.env.CLIENT_ID);
  console.log("CLIENT_SECRET:", process.env.CLIENT_SECRET);

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
    });

    const data = await response.json();
    res.json({ accessToken: data.access_token });
  } catch (error) {
    console.error("Error fetching token:", error);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});
