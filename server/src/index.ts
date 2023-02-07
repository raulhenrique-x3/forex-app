import express, { NextFunction, Request, Response } from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/Router";
import dotenv from "dotenv";
const port = 5000;
import http from "http";
import { Server } from "socket.io";
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
dotenv.config({ path: "./src/.env" });
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

interface IUser {
  data: object | string;
}

const connections = new Set();

io.on("connection", (socket) => {
  connections.add(socket);

  socket.on("deposit_money", (data: object) => {
    socket.emit("money_deposited", data);
    console.log("deposit_money: ", data);
  });

  socket.on("deposit_to_wallet", (data: object) => {
    socket.emit("money_in_wallet", data);
    console.log("deposit_to_wallet", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
mongoose
  .connect(process.env.DB_URI!)
  .then(() => console.log("Connected to DB"))
  .catch((err: any) => console.error("Could not connect", err));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).send({ message: err.message });
  }

  return res.status(500).send({
    status: "error",
    message: `Internal server error - ${err}`,
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export { server };
