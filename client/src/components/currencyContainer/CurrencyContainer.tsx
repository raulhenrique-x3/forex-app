import { Avatar, Card, Container, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { IoLogoUsd } from "react-icons/io";
import { AiFillPoundCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

interface ICurrencyContainer {
  userId?: React.ReactNode;
  userName?: string;
  userEmail?: string;
  price?: any[];
  Value?: number;
  userWallet?: any;
  userBalance?: number;
  userGbpBalance?: number;
  showGBP?: boolean;
  showUSD?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
}

const CurrencyContainer: React.FC<ICurrencyContainer> = ({ userId, showGBP, showUSD, showArrow }) => {
  const [usdApi, setUsdApi] = useState<number>();
  const [gbpApi, setGbpApi] = useState<number>();
  const navigate = useNavigate();
  useEffect(() => {
    const socket = io("ws://localhost:5000", { autoConnect: true });
    socket.connect();
    setInterval(() => {
      socket.on("Updated data from usd_to_gbp API", (data) => {
        setUsdApi(data);
      });

      socket.on("Updated data from gbp_to_usd API", (data) => {
        setGbpApi(data);
      });
    }, 1000);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {showUSD && (
        <Container
          marginTop={4}
          cursor={"pointer"}
          onClick={() => navigate(`/wallet/buy_currency/usd_to_gbp/${userId}`)}
        >
          <Card padding={4}>
            <Flex align={"center"} gap={8}>
              <Avatar bg="#ffffff" icon={<IoLogoUsd color="#000000" />} />
              <Text> USD-GBP: {usdApi}</Text>
              {showArrow && <BsArrowRightSquareFill color="#000000" cursor={"pointer"} />}
            </Flex>
          </Card>
        </Container>
      )}
      {showGBP && (
        <Container
          marginTop={4}
          cursor={"pointer"}
          onClick={() => navigate(`/wallet/buy_currency/gbp_to_usd/${userId}`)}
        >
          <Card padding={4}>
            <Flex alignItems={"center"} gap={8}>
              <Avatar bg="#ffffff" icon={<AiFillPoundCircle color="#000000" />} />
              <Text> GBP-USD: {gbpApi}</Text>
              {showArrow && <BsArrowRightSquareFill color="#000000" cursor={"pointer"} />}
            </Flex>
          </Card>
        </Container>
      )}
    </>
  );
};

export default CurrencyContainer;
