import User from "../../models/userData";
import app from "../../index";
import request from "supertest";
import mongoose from "mongoose";
import { ExchangeUserMock } from "./exchangeUserMock";
import dotenv from "dotenv";
dotenv.config({ path: "../../src/.env" });

jest.setTimeout(60000);

beforeAll(async () => {
  await mongoose
    .connect(process.env.DB_TEST_URI!)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));
  await request(app).post("/register").send(ExchangeUserMock);
});

afterAll(async () => {
  await User.findOneAndRemove({ userEmail: ExchangeUserMock.userEmail });
});

describe("User try to exchange GBP-USD", () => {
  it("try to buy gbp using usd", async () => {
    const userAlreadyExists = await User.findOne({ userEmail: ExchangeUserMock.userEmail });
    const userId = userAlreadyExists?.id;

    await User.findByIdAndUpdate(userId, { $inc: { "userWallet.usdAmount": 1000 } });
    const res = await request(app)
      .put(`/exchange/${userId}`)
      .send({ currencyValue: 0.8, userQuantity: 10, choosedCurrency: "GBP-USD" });

    await request(app).put(`/exchange/${userId}`);
    expect(res.statusCode).toBe(200);
  });

  it("Bought 10 gbp and got 992 at usdAmount", async () => {
    const userAlreadyExists = await User.findOne({ userEmail: ExchangeUserMock.userEmail });
    const userWallet_usdAmount = userAlreadyExists?.userWallet.usdAmount;

    expect(userWallet_usdAmount).toBe(990);
  });

  it("He tries to buy more GBP than the amount of USD in his wallet", async () => {
    const userAlreadyExists = await User.findOne({ userEmail: ExchangeUserMock.userEmail });
    const userId = userAlreadyExists?.id;

    const res = await request(app)
      .put(`/exchange/${userId}`)
      .send({ currencyValue: 0.8, userQuantity: 1000000, choosedCurrency: "GBP-USD" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Insufficient amount for the transaction..." });
  });

  it("try to buy usd using gbp", async () => {
    const userAlreadyExists = await User.findOne({ userEmail: ExchangeUserMock.userEmail });
    const userId = userAlreadyExists?.id;

    await User.findByIdAndUpdate(userId, { $set: { "userWallet.gbpAmount": 992 } });
    const res = await request(app)
      .put(`/exchange/${userId}`)
      .send({ currencyValue: 1.2, userQuantity: 10, choosedCurrency: "USD-GBP" });

    await request(app).put(`/exchange/${userId}`);
    expect(res.statusCode).toBe(200);
  });

  it("Bought 12 USD and got 988 at gbpAmount", async () => {
    const userAlreadyExists = await User.findOne({ userEmail: ExchangeUserMock.userEmail });
    const userWallet_gbpAmount = userAlreadyExists?.userWallet.gbpAmount;
    expect(userWallet_gbpAmount).toBe(982);
  });
});
