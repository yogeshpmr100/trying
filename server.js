const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const rooms = new Map();

io.on('connection', socket => {
    socket.on('join-room', (roomId, password, username, isHost) => {
        if (!rooms.has(roomId)) {
            rooms.set(roomId, {
                password,
                users: new Map(),
                host: isHost ? socket.id : null
            });
        }

        const room = rooms.get(roomId);

        if (room.password !== password) {
            socket.emit('error', 'Incorrect password');
            return;
        }

        room.users.set(socket.id, username);
        socket.join(roomId);

        socket.on('disconnect', () => {
            room.users.delete(socket.id);
            if (room.users.size === 0) {
                rooms.delete(roomId);
            }
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
