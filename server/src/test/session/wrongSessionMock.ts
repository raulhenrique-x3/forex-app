interface ISessionMock {
  userEmail: string;
  userPassword: string;
}

export const WrongSessionMock = {
  userEmail: "wrongUser@email.com",
  userPassword: "wrongUserPassword123@",
};
