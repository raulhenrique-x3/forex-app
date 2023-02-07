import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineMenu } from "react-icons/hi";
import styles from "./header.module.scss";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DesktopHeaderInfos } from "../desktopHeaderInfos/DesktopHeaderInfos";
import { IUser } from "../../interface/interface";
import { Wallet } from "../wallet/Wallet";

interface IHeader {
  user: IUser[];
}

const Header: React.FC<IHeader> = ({ user }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  let { userId } = useParams();

  const userLogout = () => {
    logout();
    if (!isAuthenticated) {
      navigate("/");
    } else {
      return;
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <header className={styles.header}>
      <Link to={`/home/${userId}`}>
        <p className={styles.headerText}>Forex-app</p>
      </Link>
      <div className={styles.desktopView}>
        <Button rounded={"full"} bgColor={"#ffffff"} onClick={onOpen}>
          <HiOutlineMenu color="#8236FD" />
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent backgroundColor={"#F1F1F1"}>
            <DrawerCloseButton />

            <DrawerBody display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <Box
                marginTop={8}
                width="100%"
                backgroundColor="#8236fd"
                color="#000000"
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                gap={1}
                borderRadius={5}
                padding={2}
                marginBottom={4}
              >
                <Avatar backgroundColor={"#F1F1F1"} color={"#000000"} size="lg" name={user[0]?.userName} />
                <Container>
                  <Text fontSize="lg" color={"#ffffff"} fontWeight="bold">
                    {user[0]?.userName}
                  </Text>
                  <Text fontSize="md" color={"#ffffff"}>
                    {user[0]?.userEmail}
                  </Text>
                </Container>
              </Box>
              <Container>
                <Wallet />
              </Container>
              <Container marginTop={8}>
                <Flex direction={"column"} gap={8}>
                  <Text fontWeight={600} color={"#8236fd"} borderBottom={"1px solid #8236fd"}>
                    <Link to={`/home/${userId}`}>Home</Link>
                  </Text>
                  <Text fontWeight={600} color={"#8236fd"} borderBottom={"1px solid #8236fd"}>
                    <Link to={`/wallet/${userId}`}>Wallet </Link>
                  </Text>
                  <Text fontWeight={600} color={"#8236fd"} borderBottom={"1px solid #8236fd"}>
                    <Link to={`/history/${userId}`}>History </Link>
                  </Text>
                </Flex>
              </Container>
            </DrawerBody>

            <DrawerFooter>
              <Button colorScheme="blue" onClick={userLogout}>
                Logout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <nav className={styles.desktopNav}>
        <ul className={styles.desktopUl}>
          <li>
            <Link to={`/home/${userId}`}>Home </Link>
          </li>

          <li>
            <Link to={`/wallet/${userId}`}>Wallet </Link>
          </li>
          <li>
            <Link to={`/history/${userId}`}>History </Link>
          </li>
        </ul>
        <Button colorScheme="blue" onClick={userLogout}>
          Logout
        </Button>
      </nav>
    </header>
  );
};

export default Header;
