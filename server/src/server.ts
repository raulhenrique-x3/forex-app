const port = 5000;
import app from "./index";
import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET"],
  },
});
const connections = new Set();

io.on("connection", (socket) => {
  socket.on("Previous data from API", (data: object) => {
    setInterval(() => {
      socket.emit("Atualized data from API", data);
    }, 5000);
  });
  connections.add(socket);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
