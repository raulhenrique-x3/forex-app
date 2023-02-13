import { Avatar, Card, Container, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
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
  const socket = io("http://localhost:5000", { autoConnect: true });
  const [usdApi, setUsdApi] = useState<number>();
  const [gbpApi, setGbpApi] = useState<number>();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("ping", () => {
      socket.emit("pong");
    });
    socket.on("Updated data from usd_to_gbp API", (data) => {
      setInterval(() => {
        setUsdApi(data);
      }, 3000);
    });

    socket.on("Updated data from gbp_to_usd API", (data) => {
      setInterval(() => {
        setGbpApi(data);
      }, 3000);
    });

    return () => {
      socket.off("Updated data from usd_to_gbp API");
      socket.off("Updated data from gbp_to_usd API");
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
              <Text color={"#000000"} fontWeight={"bold"}>
                USD-GBP: {usdApi}
              </Text>
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
              <Text color={"#000000"} fontWeight={"bold"}>
                GBP-USD: {gbpApi}
              </Text>
              {showArrow && <BsArrowRightSquareFill color="#000000" cursor={"pointer"} />}
            </Flex>
          </Card>
        </Container>
      )}
    </>
  );
};

export default CurrencyContainer;
