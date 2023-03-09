const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

app.use(
  cors({
    origin: "http://localhost:3000", // 허락하고자 하는 요청 주소.
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.이거없으면 cors걸림
  })
);

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Hello world",
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
