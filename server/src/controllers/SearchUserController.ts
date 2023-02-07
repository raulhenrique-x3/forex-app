import User from "../models/userData";
import { Request, Response } from "express";

export default {
  async create(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send({ message: "User not found" });
      res.send(user);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  },
};
