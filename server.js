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
    socket.emit("message", "Wecome to chatcord");

    //Broadcast when user connects
    socket.broadcast.emit("message", "A user has entered the chat");

    //Runs when client disconnects
    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat");
    });

    socket.on("chatMessage", (msg) => {
        io.emit("message", msg);
    });
});

server.listen(PORT, () => console.log("Server running on port 3000"));
