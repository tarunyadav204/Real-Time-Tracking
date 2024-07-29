const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/', (req, res) => {
    res.render('index');
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');


    socket.on("send-location", (data) => {
        console.log(data);

        io.emit("receive-location", { id: socket.id, ...data });

    });


    socket.on('disconnect', () => {
        io.emit("user-disconnected", socket.id)
        console.log('User disconnected');
    });
});

// Start the server
server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
