import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { TableHistory } from "../../components/tableHistory/TableHistory";
import styles from "./historyPage.module.scss";

interface IUser {
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
}

export const HistoryPage = () => {
  const [userData, setUserData] = useState<IUser[]>([]);
  let { userId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/home/${userId}`)
      .then((res) => {
        setUserData([res.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className={styles.historyPageMain}>
      <Header user={userData} />
      <div className={styles.historyPageDesktop}>
        <TableHistory user={userData} label={"All exchanges"} />
      </div>
    </main>
  );
};
