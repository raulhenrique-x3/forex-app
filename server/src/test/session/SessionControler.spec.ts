import User from "../../models/userData";
import app from "../../index";
import request from "supertest";
import { SessionMock } from "./sessionMock";
import { WrongSessionMock } from "./wrongSessionMock";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../../src/.env" });
jest.setTimeout(60000);

beforeEach(async () => {
  await mongoose
    .connect(process.env.DB_TEST_URI!)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));
});

afterAll(async () => {
  await User.findOneAndRemove({ userEmail: SessionMock.userEmail });
});

describe("Should be able to login", () => {
  it("get success on login with correct email and password?", async () => {
    await User.findOne({ userEmail: SessionMock.userEmail, userPassword: SessionMock.userPassword });
    const res = await request(app).post("/session").send(SessionMock);
    expect(res.statusCode).toBe(200);
  });

  it("try to login with incorrect email", async () => {
    const res = await request(app)
      .post("/session")
      .send({ userEmail: WrongSessionMock.userEmail, userPassword: SessionMock.userPassword });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Wrong email or password" });
  });

  it("try to login with incorrect password?", async () => {
    const res = await request(app)
      .post("/session")
      .send({ userEmail: SessionMock.userEmail, userPassword: WrongSessionMock.userPassword });

    await User.findOne({
      userEmail: SessionMock.userEmail,
      userPassword: WrongSessionMock.userPassword,
    });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Invalid password" });
  });
});
