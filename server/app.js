const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const server = http.createServer(app);

server.listen(5050, () => {
  console.log("Server is running on port 5050");
});
