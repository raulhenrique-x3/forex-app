import { Avatar, Card, Container, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { IoLogoUsd } from "react-icons/io";
import { AiFillPoundCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface ICurrencyContainer {
  userId?: React.ReactNode;
  userName?: string;
  userEmail?: string;
  price?: any[];
  value?: number;
  userWallet?: any;
  userBalance?: number;
  userGbpBalance?: number;
  showGBP?: boolean;
  showUSD?: boolean;
  onClick?: () => void;
}

const CurrencyContainer: React.FC<ICurrencyContainer> = ({ userId, showGBP, showUSD }) => {
  const [usdApi, setUsdApi] = useState<ICurrencyContainer[]>([]);
  const [gbpApi, setGbpApi] = useState<ICurrencyContainer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/usd_to_gbp`)
      .then((res) => {
        setTimeout(() => {
          setUsdApi(res.data);
        }, 500);
      })
      .catch((err) => console.error(err));
  }, [usdApi]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/gbp_to_usd`)
      .then((res) => {
        setTimeout(() => {
          setGbpApi(res.data);
        }, 500);
      })
      .catch((err) => console.error(err));
  }, [gbpApi]);

  return (
    <>
      {showUSD &&
        usdApi.map((data, key) => (
          <Container
            key={key}
            marginTop={4}
            cursor={"pointer"}
            onClick={() => navigate(`/wallet/buy_currency/usd_to_gbp/${userId}`)}
          >
            <Card padding={4}>
              <Flex align={"center"} gap={8}>
                <Avatar bg="#006e2e" icon={<IoLogoUsd />} />
                <Text color={"#000000"} fontWeight={"bold"}>
                  USD-GBP:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(data.value!)}
                </Text>

                <BsArrowRightSquareFill color="#000000" cursor={"pointer"} />
              </Flex>
            </Card>
          </Container>
        ))}
      {showGBP &&
        gbpApi.map((data, key) => (
          <Container
            key={key}
            marginTop={4}
            cursor={"pointer"}
            onClick={() => navigate(`/wallet/buy_currency/gbp_to_usd/${userId}`)}
          >
            <Card padding={4}>
              <Flex alignItems={"center"} gap={8}>
                <Avatar bg="#ffd000" icon={<AiFillPoundCircle color="#000000" />} />
                <Text color={"#000000"} fontWeight={"bold"}>
                  GBP-USD:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(data.value!)}
                </Text>
                <BsArrowRightSquareFill color="#000000" cursor={"pointer"} />
              </Flex>
            </Card>
          </Container>
        ))}
    </>
  );
};

export default CurrencyContainer;
