import axios from "axios";
import { Request, Response } from "express";

export const USD_TO_GBP = {
  create: async (req: Request, res: Response) => {
    await axios
      .get(
        `https://api.wsj.net/api/dylan/currencies/v1/convert?source=USD&target=GBPUSD&value=1.00&ckey=cecc4267a0&EntitlementToken=cecc4267a0194af89ca343805a3e57af`
      )
      .then((response) => {
        res.send([response?.data]);
      })
      .catch((err) => console.error(err));
  },
};

export const GBP_TO_USD = {
  create: async (req: Request, res: Response) => {
    await axios
      .get(
        `https://api.wsj.net/api/dylan/currencies/v1/convert?source=USD&target=USDGBP&value=1.00&ckey=cecc4267a0&EntitlementToken=cecc4267a0194af89ca343805a3e57af`
      )
      .then((response) => {
        res.send([response?.data]);
      })
      .catch((error) => {
        res.status(400).send({ message: "API Fetch error, ", error });
      });
  },
};
