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

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket이 들어온다
io.on("connection", (socket) => {
  //현재 접속되어 있는 클라이언트로부터의 메시지를 수신하기 위해서는 on 메소드를 사용한다.
  socket.on("message", ({ name, message }) => {
    //접속된 모든 클라이언트에게 메시지를 전송한다.
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
