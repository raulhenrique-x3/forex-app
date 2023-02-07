import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

export const USD_GBP_HISTORY = {
  create: async (req: Request, res: Response) => {
    try {
      const response = await axios.get(
        `https://wise.com/rates/history+live?source=USD&target=GBP&length=7&resolution=hourly&unit=day`
      );
      const dataArr = [];
      if (response) {
        dataArr.push(response.data);
      }
      res.send(dataArr);
    } catch (error) {
      res.status(500).json({ message: "API Fetch error" });
    }
  },
};

export const GBP_USD_HISTORY = {
  create: async (req: Request, res: Response) => {
    try {
      const response = await axios.get(
        `https://wise.com/rates/history+live?source=GBP&target=USD&length=7&resolution=hourly&unit=day`
      );
      const dataArr = [];
      if (response) {
        dataArr.push(response.data);
      }
      res.send(dataArr);
    } catch (error) {
      res.status(500).json({ message: "API Fetch error" });
    }
  },
};
