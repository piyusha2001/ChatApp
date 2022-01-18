const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
} = require('./utils/users');
const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
const botName = 'J.A.R.V.I.S(Bot) ';

io.on('connection', (socket) => {
	socket.on('joinRoom', ({ username, room }) => {
		const user = userJoin(socket.id, username, room);
		socket.join(user.room);
		//Welcome message
		socket.emit('message', formatMessage(botName, 'Welcome to chatcord'));

		//Broadcast when user connects
		socket.broadcast
			.to(user.room)
			.emit(
				'message',
				formatMessage(
					botName,
					` ${user.username} has entered the chat`,
				),
			);
	});

	socket.on('chatMessage', (msg) => {
		const user = getCurrentUser(socket.id);
		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});
	//Runs when client disconnects
	socket.on('disconnect', () => {
		const user = userLeave(socket.id);
		if (user) {
			io.to(user.room).emit(
				'message',
				formatMessage(botName, `${user.username} has left the chat`),
			);
		}
	});
});

server.listen(PORT, () => console.log('Server running on port 3000'));
