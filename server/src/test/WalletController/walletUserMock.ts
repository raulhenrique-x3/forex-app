interface ISessionMock {
  userName: string;
  userEmail: string;
  userPassword: string;
}

export const WalletUserMock: ISessionMock = {
  userName: "User Wallet test",
  userEmail: "userwallet@email.com",
  userPassword: "userPassword123@",
};
