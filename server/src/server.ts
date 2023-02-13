const port = 5000;
import app from "./index";
import http from "http";
import { Server } from "socket.io";
import axios from "axios";
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 55000,
  maxHttpBufferSize: 1e8,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET"],
  },
});

const connections = new Set();
let usd_to_gbp_val: number;
let gbp_to_usd_val: number;
function get() {
  setInterval(async () => {
    await axios.get("http://localhost:5000/api/usd_to_gbp/").then((res) => {
      usd_to_gbp_val = res?.data[0].Value;
    });
    await axios.get("http://localhost:5000/api/gbp_to_usd/").then((res) => {
      gbp_to_usd_val = res?.data[0].Value;
    });
  }, 5000);
}
get();

io.on("connection", (socket) => {
  socket.emit("Updated data from usd_to_gbp API", usd_to_gbp_val);
  socket.emit("Updated data from gbp_to_usd API", gbp_to_usd_val);

  connections.add(socket);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
