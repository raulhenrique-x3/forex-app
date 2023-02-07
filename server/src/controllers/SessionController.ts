import User from "../models/userData";
import bCrypt from "bcrypt";
import { Request, Response } from "express";

interface ISessionController {
  userEmail: string;
  userPassword: string;
}

export default {
  async create(req: Request, res: Response) {
    try {
      const { userEmail, userPassword }: ISessionController = req.body;
      const userExists = await User.findOne({ userEmail });
      if (!userExists) {
        return res.status(400).send({ message: "Wrong email or password" });
      }

      const validPassword = await bCrypt.compare(userPassword, userExists.userPassword);
      if (!validPassword) {
        return res.status(400).send({ message: "Invalid password" });
      }

      return res.status(200).send(userExists);
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  },
};
