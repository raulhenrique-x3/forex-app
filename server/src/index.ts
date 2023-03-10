import express, { NextFunction, Request, Response } from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/Router";
import dotenv from "dotenv";

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

interface IUser {
  data: object | string;
}

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

export default app;
