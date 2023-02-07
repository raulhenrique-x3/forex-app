import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

export const USD_TO_GBP = {
  create: async (req: Request, res: Response) => {
    try {
      const response = await axios.get(
        `https://wise.com/rates/live?source=USD&target=GBP&length=30&resolution=hourly&unit=day`
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

export const GBP_TO_USD = {
  create: async (req: Request, res: Response) => {
    try {
      const response = await axios.get(
        `https://wise.com/rates/live?source=GBP&target=USD&length=30&resolution=hourly&unit=day`
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
