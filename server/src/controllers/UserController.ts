import User from "../models/userData";
import bCrypt from "bcrypt";
import { Request, Response } from "express";

interface IUser {
  userName: string;
  userEmail: string;
  userPassword: string;
  userWallet: {
    usdAmount: number;
    gbpAmount: number;
    userBalance: number;
  };
}

async function hashPassword(password: string) {
  try {
    const salt = await bCrypt.genSalt(10);
    const encryptedPassword = await bCrypt.hash(password, salt);
    return encryptedPassword;
  } catch (err) {
    return console.error(err);
  }
}

export default {
  async create(req: Request, res: Response) {
    try {
      const { userName, userEmail, userPassword }: IUser = req.body;

      if (!userName && !userEmail && !userPassword) {
        return res.status(400).send({ message: "Please, fill the fields" });
      }

      if (!userName) {
        return res.status(400).send({ message: "Please, enter a username" });
      }

      if (!userEmail) {
        return res.status(400).send({ message: "Please, enter a email" });
      }

      if (!userPassword) {
        return res.status(400).send({ message: "Please, enter a password" });
      }

      const userAlreadyExists = await User.findOne<Promise<IUser>>({ userEmail });
      if (userAlreadyExists) {
        return res.status(400).send({ message: "User already exists" });
      }

      const hashedPassword = await hashPassword(userPassword);
      const newUser = new User({
        userName,
        userEmail,
        userPassword: hashedPassword,
        userWallet: {
          usdAmount: 0,
          gbpAmount: 0,
          userBalance: 0,
        },
      });

      newUser.save((error: any) => {
        if (error) {
          return res.status(400).send({ message: "Fill in the fields correctly" });
        } else {
          return res.status(200).send("User successfully registered!");
        }
      });
    } catch (err: any) {
      throw res.status(400).send({ message: "Fill in the fields correctly" });
    }
  },
};
