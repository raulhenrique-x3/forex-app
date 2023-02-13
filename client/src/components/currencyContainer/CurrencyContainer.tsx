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
  const socket = io("ws://localhost:5000", { autoConnect: true });
  const [usdApi, setUsdApi] = useState<ICurrencyContainer[]>([]);
  const [gbpApi, setGbpApi] = useState<ICurrencyContainer[]>([]);
  const [ioResponse, setIoResponse] = useState<object[]>();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("Atualized data from API", (data) => {
      setIoResponse([data]);
    });
    setInterval(() => {
      socket.emit("Previous data from API");
    }, 1000);

    return () => {
      socket.off("Atualized data from API");
    };
  }, [socket]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/usd_to_gbp`)
      .then((res) => {
        setUsdApi([res?.data?.[0]]);
      })
      .catch((err) => console.error(err));
  }, [ioResponse]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/gbp_to_usd`)
      .then((res) => {
        setGbpApi([res?.data[0]]);
      })
      .catch((err) => console.error(err));
  }, [ioResponse]);

  return (
    <>
      {showUSD &&
        usdApi?.map((data, key) => (
          <Container
            key={key}
            marginTop={4}
            cursor={"pointer"}
            onClick={() => navigate(`/wallet/buy_currency/usd_to_gbp/${userId}`)}
          >
            <Card padding={4}>
              <Flex align={"center"} gap={8}>
                <Avatar bg="#ffffff" icon={<IoLogoUsd color="#000000" />} />
                <Text color={"#000000"} fontWeight={"bold"}>
                  USD-GBP: {data?.Value!}
                </Text>
                {showArrow && <BsArrowRightSquareFill color="#000000" cursor={"pointer"} />}
              </Flex>
            </Card>
          </Container>
        ))}
      {showGBP &&
        gbpApi?.map((data, key) => (
          <Container
            key={key}
            marginTop={4}
            cursor={"pointer"}
            onClick={() => navigate(`/wallet/buy_currency/gbp_to_usd/${userId}`)}
          >
            <Card padding={4}>
              <Flex alignItems={"center"} gap={8}>
                <Avatar bg="#ffffff" icon={<AiFillPoundCircle color="#000000" />} />
                <Text color={"#000000"} fontWeight={"bold"}>
                  GBP-USD: {data?.Value!}
                </Text>
                {showArrow && <BsArrowRightSquareFill color="#000000" cursor={"pointer"} />}
              </Flex>
            </Card>
          </Container>
        ))}
    </>
  );
};

export default CurrencyContainer;
