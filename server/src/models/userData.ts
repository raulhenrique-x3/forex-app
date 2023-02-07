import mongoose from "mongoose";
export interface IUser {
  userName: string;
  userEmail: string;
  userPassword: string;
  userWallet: {
    usdAmount: number;
    gbpAmount: number;
    userBalance: number;
  };
  userExchangeHistory: [{}];
}
const UserDataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userWallet: {
    usdAmount: {
      type: Number,
      validator: {
        min: 0,
      },
    },
    gbpAmount: {
      type: Number,
      validator: {
        min: 0,
      },
    },
    userBalance: {
      type: Number,
    },
  },
  userExchangeHistory: [
    {
      purchasedCurrency: {
        type: String,
      },
      currencyAmount: {
        type: Number,
      },
      dateOfExchange: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model<IUser>("User", UserDataSchema);
export default User;
