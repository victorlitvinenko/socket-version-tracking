// const express = require("express");
const fs = require("fs");
// const app = express();
// const server = http.createServer(app);
const http = require("http");
const server = http.createServer();
const { Server } = require("socket.io");
const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

let version;

try {
  version = fs.readFileSync("./version.txt", { encoding: "utf8", flag: "r" }).trim();
} catch (err) {
  version = "initial";
}

io.on("connection", (socket) => {
  console.log("a client connected");
  io.emit("current version", version);

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });

  // socket.on("new version", (newVersion) => {
  //   version = newVersion;
  //   fs.writeFileSync("./version.txt", version, {
  //     encoding: "utf8",
  //     flag: "w",
  //   });
  //   io.emit("current version", version);
  // });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
