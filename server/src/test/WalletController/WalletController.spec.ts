import User from "../../models/userData";
import app from "../../index";
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { WalletUserMock } from "./walletUserMock";

dotenv.config({ path: "../../src/.env" });
jest.setTimeout(60000);

beforeEach(async () => {
  await mongoose
    .connect(process.env.DB_TEST_URI!)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));
  await request(app).post("/register").send(WalletUserMock);
});

afterAll(async () => {
  await User.findOneAndRemove({ userEmail: WalletUserMock.userEmail });
});

describe("User try to put money in his wallet", () => {
  it("try to put an valid amount of money in his wallet", async () => {
    const userAlreadyExists = await User.findOne({ userEmail: WalletUserMock.userEmail });
    const userId = userAlreadyExists?.id;
    const res = await request(app).put(`/session/${userId}`).send({ addToWallet: 1000 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Value added successfully!" });
  });

  it("try to put 0 in his wallet", async () => {
    const userAlreadyExists = await User.findOne({ userEmail: WalletUserMock.userEmail });
    const userId = userAlreadyExists?.id;
    const res = await request(app).put(`/session/${userId}`).send({ addToWallet: 0 });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Incorrect value" });
  });

  it("try to put an negative amount in his wallet", async () => {
    const userAlreadyExists = await User.findOne({ userEmail: WalletUserMock.userEmail });
    const userId = userAlreadyExists?.id;
    const res = await request(app).put(`/session/${userId}`).send({ addToWallet: -1 });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Incorrect value" });
  });

  it("try to put an NaN to the wallet", async () => {
    const userAlreadyExists = await User.findOne({ userEmail: WalletUserMock.userEmail });
    const userId = userAlreadyExists?.id;
    const res = await request(app).put(`/session/${userId}`).send({ addToWallet: "any" });
    expect(res.statusCode).toBe(500);
  });
});
