const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const cors = require("cors");
const { log } = require("console");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const users = new Set();

io.on("connection", (socket) => {
  console.log("connection has been made successfully");

  socket.on("join", (username) => {
    if (!username || typeof username !== "string") {
        console.error("Invalid username");
        return;
    }

    if (users.has(username)) {
        socket.emit("error", "Username already taken");
        return;
    }

    const normalizedUsername = username.trim().toLowerCase();

    console.log(`${normalizedUsername} has joined the chat`);

    users.add(normalizedUsername);
    socket.userName = normalizedUsername;

    io.emit("userJoined", normalizedUsername);
    io.emit("userList", Array.from(users));
  });

  socket.on("disconnect", () => {
    console.log("user ", socket.userName, " wants to disconnect");
    if (users.delete(socket.userName)) {
      console.log(`${socket.userName} has been removed`);
      io.emit("userRemoved", socket.userName);
    }
    io.emit("userList", Array.from(users));
  });

  socket.on("newMessage",(message)=>{
    if (!message || typeof message !== "string") {
        console.error("Invalid message");
        return;
    }
    io.emit("newMessage",message);
  })
});

server.listen(5000, () => {
  console.log("server running at http://localhost:5000");
});
