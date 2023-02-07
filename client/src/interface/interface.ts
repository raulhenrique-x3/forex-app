export interface IUser {
  _id?: string;
  userName?: string;
  userEmail?: string;
  price?: any[];
  value?: number;
  userWallet?: {
    usdAmount: number;
    gbpAmount: number;
    userBalance: number;
  };
  money?: number;
  userExchangeHistory?: [
    {
      purchasedCurrency: string;
      currencyAmount: number;
      dateOfExchange: string;
    }
  ];
  ioUpdate?: object[];
}
