import User from "../models/userData";
import { Request, Response } from "express";

interface IExchange {
  choosedCurrency: string;
  currencyValue: number;
  userQuantity: number;
}

export default {
  async create(req: Request, res: Response) {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const usdAmount = user?.userWallet?.usdAmount!;
    const gbpAmount = user?.userWallet?.gbpAmount!;
    const { currencyValue, userQuantity, choosedCurrency }: IExchange = req.body;
    try {
      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }

      switch (choosedCurrency) {
        case "GBP-USD":
          if (usdAmount < currencyValue * userQuantity) {
            res.status(400).send({ message: "Insufficient amount for the transaction..." });
          } else if (userQuantity <= 0) {
            res.status(400).send({ message: "Enter a correct value..." });
          } else {
            await User.findByIdAndUpdate(userId, {
              $inc: {
                "userWallet.usdAmount": -userQuantity,
              },
            })
              .then(() =>
                User.findByIdAndUpdate(userId, {
                  $inc: {
                    "userWallet.gbpAmount": userQuantity * currencyValue,
                  },

                  $set: { "userWallet.userBalance": gbpAmount + usdAmount },
                })
              )
              .catch((err) => res.status(400).send({ message: err }))
              .finally(() => {
                return res.status(200).send("Success");
              });
          }
          break;
        case "USD-GBP":
          if (gbpAmount < currencyValue * userQuantity) {
            res.status(400).send({ message: "Insufficient amount for the transaction..." });
          } else if (userQuantity <= 0) {
            res.status(400).send({ message: "Enter a correct value..." });
          } else {
            await User.findByIdAndUpdate(userId, {
              $inc: {
                "userWallet.gbpAmount": -userQuantity,
              },
            })
              .then(() =>
                User.findByIdAndUpdate(userId, {
                  $inc: {
                    "userWallet.usdAmount": userQuantity * currencyValue,
                  },
                  $set: { "userWallet.userBalance": gbpAmount + usdAmount },
                })
              )
              .catch((err) => res.status(400).send({ message: err }))
              .finally(() => {
                return res.status(200).send("Success");
              });
          }
          break;
        default:
          return res.status(400).send("Bad request!");
      }
    } catch (error) {
      throw res.status(400).send({ message: error });
    }
  },
};
