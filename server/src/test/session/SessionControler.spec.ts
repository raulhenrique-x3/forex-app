import User from "../../models/userData";
import app from "../../index";
import request from "supertest";
import { SessionMock } from "./sessionMock";
import { WrongSessionMock } from "./wrongSessionMock";

describe("Test if user can login in app", () => {
  it("can login in app?", async () => {
    await request(app).post("/session").send(SessionMock);

    const searchUser = await User.findOne({ userEmail: SessionMock.userEmail });

    expect(searchUser?.userEmail).toEqual(SessionMock.userEmail);
  });

  it("try to login with incorrect email?", async () => {
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

  it("get success on login with correct email and password?", async () => {
    const res = await request(app).post("/session").send(SessionMock);

    await User.findOne({
      userEmail: SessionMock.userEmail,
      userPassword: SessionMock.userPassword,
    });

    expect(res.status).toBe(200);
  });
});
