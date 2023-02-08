import User from "../models/userData";
import { Request, Response } from "express";

export default {
  async create(req: Request, res: Response) {
    const userId = req.params.id;
    const user = User.findOne({ userId });
    const addToWallet: number = req.body.addToWallet;
    try {
      if (!user) {
        return res.status(400).send({ message: "User not found" });
      } else if (addToWallet <= 0) {
        return res.status(400).send({ message: "Incorrect value" });
      } else {
        await User.findByIdAndUpdate(userId, {
          $inc: { "userWallet.usdAmount": addToWallet, "userWallet.userBalance": addToWallet },
        }).then(() => {
          return res.status(200).send({ message: "Value added successfully!" });
        });
      }
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },
};
