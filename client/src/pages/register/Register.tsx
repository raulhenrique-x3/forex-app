import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const toast = useToast();
  const register = () => {
    axios
      .post("http://localhost:5000/register", { userName: userName, userEmail: userEmail, userPassword: userPassword })
      .then((res) => {
        toast({
          title: res.data,
          status: "success",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.response.data.message,
          status: "warning",
          isClosable: true,
        });
      })
      .finally(() => {
        setUserName("");
        setUserEmail("");
        setUserPassword("");
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
              Register
            </Text>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="name">Your name</FormLabel>
                  <Input value={userName} placeholder="ex: John Doe" onChange={(e) => setUserName(e.target.value)} />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    value={userEmail}
                    id="email"
                    placeholder="ex: user@email.com"
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    value={userPassword}
                    type="password"
                    id="password"
                    placeholder="min length 8"
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Button color={"#ffffff"} mt={4} backgroundColor={"#8236FD"} onClick={register}>
                  Register
                </Button>
                <Link to="/">
                  <Container marginTop={4}>
                    <Text
                      textAlign={"center"}
                      fontWeight={600}
                      color={"#8236FD"}
                      _hover={{ borderBottom: "1px solid #8236FD" }}
                    >
                      Have an account?
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
