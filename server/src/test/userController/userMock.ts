interface IUserMock {
  userName: string;
  userEmail: string;
  userPassword: string;
}

export const UserMock: IUserMock = {
  userName: "User Testing Jest",
  userEmail: "user@email.com",
  userPassword: "userPassword123@",
};
