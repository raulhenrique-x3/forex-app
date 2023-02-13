const port = 5000;
import app from "./index";
import http from "http";
import { Server } from "socket.io";
import axios from "axios";
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 120000,
  maxHttpBufferSize: 1e8,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET"],
  },
});

const connections = new Set();

io.on("connection", (socket) => {
  setInterval(async () => {
    await axios
      .get("http://localhost:5000/api/usd_to_gbp/")
      .then((res) => {
        socket.emit("Updated data from usd_to_gbp API", res?.data[0].Value);
      })
      .catch((error) => console.error(error));
    await axios
      .get("http://localhost:5000/api/gbp_to_usd/")
      .then((res) => {
        socket.emit("Updated data from gbp_to_usd API", res?.data[0].Value);
      })
      .catch((error) => console.error(error));
  }, 1000);

  connections.add(socket);
  socket.once("disconnect", function () {
    connections.delete(socket);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
