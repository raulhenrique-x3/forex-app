import { Card, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IUser } from "../../interface/interface";
import { IoLogoUsd } from "react-icons/io";
import { AiFillPoundCircle } from "react-icons/ai";

interface ICurrencyWallet {
  user: IUser[];
  walletName: string;
}

export const CurrencyWallet: React.FC<ICurrencyWallet> = ({ user, walletName }) => {
  return (
    <Card marginBottom={2} marginTop={4} padding={4}>
      {walletName === "GBP Wallet" ? (
        <Flex align={"center"}>
          <Container>
            <Text fontSize={"lg"} color={"#000000"}>
              {walletName}
            </Text>
            <Text fontSize={"xl"} color={"#000000"} fontWeight={"bold"}>
              Total:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(user[0]?.userWallet?.gbpAmount!)}
            </Text>
          </Container>
          <AiFillPoundCircle />
        </Flex>
      ) : (
        <Flex align={"center"}>
          <Container>
            <Text fontSize={"lg"} color={"#000000"}>
              {walletName}
            </Text>
            <Text fontSize={"xl"} color={"#000000"} fontWeight={"bold"}>
              Total:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(user[0]?.userWallet?.usdAmount!)}
            </Text>
          </Container>
          <IoLogoUsd />
        </Flex>
      )}
    </Card>
  );
};
