import User from "../../models/userData";
import app from "../../index";
import request from "supertest";
import { UserMock } from "./userMock";
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

describe("Test if user can be registered and saved in db", () => {
  it("can register in app?", async () => {
    await request(app).post("/register").send(UserMock);

    const userAlreadyExists = await User.findOne({ userEmail: "user@email.com" });
    expect(userAlreadyExists?.userEmail).toBeTruthy();
  });

  it("can register in app without a name?", async () => {
    const res = await request(app)
      .post("/register")
      .send({ userEmail: UserMock.userEmail, userPassword: UserMock.userPassword });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Please, enter a username" });
  });

  it("can register in app without a email?", async () => {
    const res = await request(app)
      .post("/register")
      .send({ userName: UserMock.userName, userPassword: UserMock.userPassword });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Please, enter a email" });
  });

  it("can register in app without a password??", async () => {
    const res = await request(app)
      .post("/register")
      .send({ userName: UserMock.userName, userEmail: UserMock.userEmail });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Please, enter a password" });
  });

  it("can register in app with no name, email or password??", async () => {
    const res = await request(app).post("/register").send({ userName: "", userEmail: "", userPassword: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      message: "Please, fill the fields",
    });
  });
});
