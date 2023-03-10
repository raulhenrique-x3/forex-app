import { Box, Flex, Divider, Container } from "@chakra-ui/react";
import axios from "axios";
import styles from "./home.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CurrencyContainer from "../../components/currencyContainer/CurrencyContainer";
import { DesktopHeaderInfos } from "../../components/desktopHeaderInfos/DesktopHeaderInfos";
import Header from "../../components/header/Header";
import { Wallet } from "../../components/wallet/Wallet";
import { IUser } from "../../interface/interface";

export const Home = () => {
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
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex w="100%" direction="column" alignItems="center" justifyContent="center" backgroundColor={"#F1F1F1"}>
      <Header user={userData} />
      <div className={styles.desktopViewInfo}>
        <DesktopHeaderInfos user={userData} />
      </div>
      <Container w="100%" height={"100vh"} maxWidth="400px" p={4}>
        <Box pt={4}>
          <Wallet cursor="pointer" showArrow={true} />
        </Box>
        <Divider />
        <Box>
          <CurrencyContainer showArrow={true} showGBP={true} showUSD={true} userId={userId} />
        </Box>
        <Divider />
      </Container>
    </Flex>
  );
};
