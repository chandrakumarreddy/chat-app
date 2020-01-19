const socket = io.connect("http://localhost:3000");

const send = document.getElementById("send");
const handle = document.getElementById("handle");
const message = document.getElementById("message");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

send.addEventListener("click", function() {
  socket.emit("chat", { message: message.value, handle: handle.value });
  message.value = "";
});

message.addEventListener("keypress", function() {
  socket.emit("typing", handle.value);
});

socket.on("chat", data => {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function(data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
