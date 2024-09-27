const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

app.use(cors());

/**
 * @param {string} userId - Unique user ID
 * @param {string} speechText - Text the user spoke
 * @param {string} userName - User's name
 */
const logSpeechToFile = (userId, userName, speechText) => {
  const filePath = path.join(__dirname, "logs", `${userId}.txt`);

  const timestamp = new Date().toLocaleString();

  const logEntry = `${timestamp} (${userName}): ${speechText}\n`;

  fs.appendFile(filePath, logEntry, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log(
        `Logged speech for user ${userId} (${userName}): ${speechText}`
      );
    }
  });
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("userSpeech", ({ name, speech }) => {
    console.log(`Speech received from ${name}: ${speech}`);

    logSpeechToFile(socket.id, name, speech);
    io.emit("speechToAdmin", { name, speech });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
