const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server);

try {
  const version = fs.readFileSync("./version.txt", { encoding: "utf8", flag: "r" }).trim();
  io.on("connection", () => io.emit("current version", version));
  server.listen(5000, () => console.log("listening on *:5000"));
} catch (err) {
  console.log('File version.txt not found!');
}
