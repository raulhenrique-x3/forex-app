import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Container, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { CurrencyWallet } from "../../components/currencyWallet/CurrencyWallet";
import { useParams } from "react-router";
import axios from "axios";
import { IUser } from "../../interface/interface";
import Header from "../../components/header/Header";
import { Wallet } from "../../components/wallet/Wallet";
import { TableHistory } from "../../components/tableHistory/TableHistory";
import styles from "./walletScreen.module.scss";
import { Link } from "react-router-dom";
import io from "socket.io-client";

export const WalletScreen = () => {
  const socket = io("ws://localhost:5000", { autoConnect: true });
  const [userData, setUserData] = useState<IUser[]>([]);
  const [addToWallet, setAddToWallet] = useState<string>();
  const [ioResponse, setIoResponse] = useState<object[]>();
  const toast = useToast();
  let { userId } = useParams();

  useEffect(() => {
    socket.on("money_in_wallet", (data) => {
      setIoResponse([data]);
    });

    return () => {
      socket.off("money_in_wallet");
    };
  }, [socket]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/home/${userId}`)
      .then((res) => {
        setUserData([res.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ioResponse]);

  const putMoney = () => {
    socket.emit("deposit_to_wallet", { deposit_to_wallet: parseFloat(addToWallet!) });
    axios
      .put(`http://localhost:5000/session/${userId}`, { addToWallet: parseFloat(addToWallet!) })
      .then((res) => {
        axios.put(`http://localhost:5000/history/${userId}`, {
          purchasedCurrency: "Deposit",
          currencyAmount: parseFloat(addToWallet!),
        });
        toast({
          title: res.data.message,
          status: "success",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: err.response.data.message,
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <main>
      <Header user={userData} />
      <div className={styles.walletScreenDesktop}>
        <Container>
          <Flex flexDirection={"column"}>
            <Wallet ioUpdate={ioResponse} />
            <CurrencyWallet user={userData} walletName={"GBP Wallet"} />
            <CurrencyWallet user={userData} walletName={"USD Wallet"} />
          </Flex>
          <Flex gap={5} p={5} flexDirection={"column"}>
            <FormControl>
              <FormLabel>Deposit USD</FormLabel>
              <Input placeholder="USD Amount" onChange={(e) => setAddToWallet(e.target.value)} />
            </FormControl>
            <Button color={"#ffffff"} width={"100%"} backgroundColor={"#8236FD"} onClick={putMoney}>
              Deposit
            </Button>
          </Flex>
        </Container>
        <Container>
          <TableHistory user={userData} label={"Last exchanges"} sliceFrom={0} sliceTo={5} />
          <Link to={`/history/${userId}`}>
            <Button marginTop={4} color={"#ffffff"} width={"100%"} backgroundColor={"#8236FD"}>
              See history
            </Button>
          </Link>
        </Container>
      </div>
    </main>
  );
};
