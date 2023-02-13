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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface ILogin {
  submit: ({ userEmail, userPassword }: any) => void | undefined;
}

export const Login: React.FC<ILogin> = ({ submit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const userLogin = () => {
    submit({ userEmail: "raul@email.com", userPassword: "123456789" });

    axios
      .post("http://localhost:5000/session/", { userEmail: email, userPassword: password })
      .then((res) => {
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
                <Input
                  data-testid="email"
                  type="text"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <Text>Password</Text>
                <Input
                  type="password"
                  data-testid="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Button
                  data-testid="loginButton"
                  color={"#ffffff"}
                  mt={4}
                  backgroundColor={"#8236FD"}
                  onClick={userLogin}
                >
                  Login
                </Button>
                <Link to="/register">
                  <Container marginTop={4}>
                    <Text
                      textAlign={"center"}
                      fontWeight={600}
                      color={"#8236FD"}
                      _hover={{ borderBottom: "1px solid #8236FD" }}
                    >
                      Create an account
                    </Text>
                  </Container>
                </Link>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};
