import User from "../models/userData";
import { Request, Response } from "express";

interface IHistory {
  purchasedCurrency: string;
  currencyAmount: number;
}

const currentDate = new Date();

const formattedDate = currentDate.toLocaleString("default", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
});

const dateAndTime = `${formattedDate}`;

export default {
  async create(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      const { purchasedCurrency, currencyAmount }: IHistory = req.body;
      if (purchasedCurrency) {
        User.findByIdAndUpdate(
          userId,
          {
            $push: { userExchangeHistory: { purchasedCurrency, currencyAmount, dateOfExchange: dateAndTime } },
          },
          { new: true },
          (err, doc) => {
            if (err) {
              res.status(500).send({ message: err });
            } else {
              return res.status(200).send({ message: "Success" });
            }
          }
        );
      }
    } catch (err) {
      res.status(500).send({ message: err });
    }
  },
};
