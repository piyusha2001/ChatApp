const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
io.on("connection", (socket) => {
    console.log("New ws connection");
    socket.emit("message", "Wecome to chatcord");
});

server.listen(PORT, () => console.log("Server running on port 3000"));
