const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let version = '7b4c2472';

io.on('connection', (socket) => {
  console.log('a client connected');
  io.emit('current version', version);

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });

  socket.on('new version', (newVersion) => {
    version = newVersion;
    io.emit('current version', version);
  });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});
