const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server);

try {
  const version = fs.readFileSync("./version.txt", { encoding: "utf8", flag: "r" }).trim();
  io.on("connection", (socket) => {
    console.log("a client connected");
    io.emit("current version", version);

    socket.on("disconnect", () => {
      console.log("client disconnected");
    });
  });

  server.listen(5000, () => {
    console.log("listening on *:5000");
  });
} catch (err) {
  console.log('File version.txt not found!');
}
