import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormLabel,
  Input,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

export const Login = () => {
  const socket = io("http://localhost:5000", { autoConnect: false });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("success_login", () => {
      login(true);
    });

    socket.on("disconnect", () => {
      login(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const userLogin = () => {
    axios
      .post("http://localhost:5000/session/", { userEmail: email, userPassword: password })
      .then((res) => {
        socket.emit("user_login");
        login(true);
        toast({
          title: "Logged",
          status: "success",
          isClosable: true,
        });
        navigate(`/home/${res.data._id}`);
      })
      .catch((err) => {
        toast({
          title: err.response.data.message,
          status: "error",
          isClosable: true,
        });
      });
  };
  return (
    <Box
      backgroundColor={"#cccccc"}
      width={"100vw"}
      height={"100vh"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Container>
        <Card>
          <CardHeader>
            <Text fontSize={"1.5rem"} fontWeight={"bold"}>
              Login
            </Text>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <FormLabel>Email</FormLabel>
                <Input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
              </Box>
              <Box>
                <Text>Password</Text>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Button color={"#ffffff"} mt={4} backgroundColor={"#8236FD"} onClick={userLogin}>
                  Login
                </Button>
                <Link to="/register">
                  <Text textAlign={"center"}>Create an account</Text>
                </Link>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};
