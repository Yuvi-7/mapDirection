const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "build")));

// Serve the React app for any route
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "", "/public/index.html"));
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "/public/index.html"));
});

// API endpoint to fetch data from TollGuru
app.post("/tollguru-data", async (req, res) => {
  try {
    // Dummy data object to send to TollGuru API

    const response = await axios.post(
      "https://apis.tollguru.com/toll/v2/complete-polyline-from-mapping-service",
      req.body,
      {
        headers: {
          "x-api-key": "4tbg7P7qfbJJtb4NQ2d6L4mpM3Q9bfdr",
          "Content-Type": "application/json",
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    console.error("Error fetching data from TollGuru:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
