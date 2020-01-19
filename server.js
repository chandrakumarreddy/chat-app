const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(3000);

app.use(express.static("./public"));

io.on("connection", function(socket) {
  socket.on("chat", msg => {
    io.sockets.emit("chat", msg);
  });
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
