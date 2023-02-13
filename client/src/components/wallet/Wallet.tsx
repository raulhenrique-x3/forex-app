import { Card, Container, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IUser } from "../../interface/interface";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

interface IWallet {
  cursor?: "pointer";
  showArrow?: boolean;
}

export const Wallet: React.FC<IWallet> = ({ cursor, showArrow }) => {
  const [userData, setUserData] = useState<IUser[]>([]);
  let { userId } = useParams();
  const navigate = useNavigate();

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

  const navigateToWallet = () => {
    showArrow && navigate(`/wallet/${userId}`);
  };

  return (
    <Card
      padding={4}
      display={"flex"}
      backgroundColor={"#8236FD"}
      onClick={navigateToWallet}
      justifyContent={"space-around"}
      cursor={cursor}
      data-testid={"walletComponent"}
    >
      <Flex alignItems={"center"}>
        <Container>
          <Text fontSize={"lg"} color={"#ffffff"}>
            Wallet balance:{" "}
          </Text>
          <Text fontSize={"xl"} color={"#ffffff"} fontWeight={"bold"}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(userData[0]?.userWallet?.userBalance!)}
          </Text>
        </Container>
        {showArrow && <BsFillArrowRightSquareFill color={"#ffffff"} />}
      </Flex>
    </Card>
  );
};
