import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Text,
  Select,
  Container,
  Input,
  Button,
  InputRightElement,
  CheckboxIcon,
  InputGroup,
  InputLeftElement,
  Flex,
  useToast,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "../../components/header/Header";
import { useParams } from "react-router";
import axios from "axios";
import { CurrencyWallet } from "../../components/currencyWallet/CurrencyWallet";
import { IUser } from "../../interface/interface";
import { Wallet } from "../../components/wallet/Wallet";
import styles from "./buyCurrency.module.scss";
import io from "socket.io-client";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

interface IBuyCurrency {
  map(arg0: (i: any) => any): any;
  source?: string;
  target?: string;
  value?: number;
  time?: number;
}

export const BuyCurrency = () => {
  const socket = io("ws://localhost:5000", { autoConnect: true });
  const [apiData, setApiData] = useState<IBuyCurrency[]>([]);
  const [userData, setUserData] = useState<IUser[]>([]);
  const [currencyValue, setCurrencyValue] = useState<IBuyCurrency[]>([]);
  const [userQuantity, setUserQuantity] = useState<string>();
  const [choosedCurrency, setChoosedCurrency] = useState<string>();
  const [ioResponse, setIoResponse] = useState<object[]>();
  const toast = useToast();

  let { userId } = useParams();
  const { exchange } = useParams();

  useEffect(() => {
    socket.on("money_deposited", (data) => {
      setIoResponse([data]);
    });

    return () => {
      socket.off("money_deposited");
    };
  }, [socket]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/home/${userId}`)
      .then((res) => {
        setUserData([res.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ioResponse]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/history/${exchange}`)
      .then((res) => {
        setApiData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${exchange}`)
      .then((res) => {
        setCurrencyValue(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  let numbers: number[] = [];

  for (let i = 0; i < 169; i++) {
    numbers.push(i);
  }

  const data = {
    labels: numbers,
    datasets: [
      {
        label: "Taxa de Câmbio do GBP",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: apiData[0]?.map((i) => i.value),
      },
    ],
  };

  const buyCurrency = () => {
    socket.emit("deposit_money", { depositMoney: parseFloat(userQuantity!) });
    axios
      .put(`http://localhost:5000/exchange/${userId}`, {
        currencyValue: currencyValue[0]?.value,
        userQuantity: parseFloat(userQuantity!),
        choosedCurrency: choosedCurrency,
      })
      .then((res) => {
        axios.put(`http://localhost:5000/history/${userId}`, {
          purchasedCurrency: choosedCurrency,
          currencyAmount: parseFloat(userQuantity!),
        });
        toast({
          title: res.data,
          status: "success",
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: err.message,
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <main className={styles.buyCurrencyMain}>
      <Header user={userData} />
      <div className={styles.desktopCurrencyWallet}>
        <Line options={options} data={data} />

        <Container display={"flex"} flexDirection={"column"} gap={4}>
          <Container>
            <Wallet ioUpdate={ioResponse} />
            <CurrencyWallet walletName="GBP Wallet" user={userData} />
            <CurrencyWallet walletName="USD Wallet" user={userData} />
          </Container>
          <Container display={"flex"} flexDirection={"column"} gap={4}>
            <Text fontSize="xl">Buy</Text>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input placeholder="Enter amount" onChange={(e) => setUserQuantity(e.target.value)} />
              <InputRightElement children={<CheckboxIcon color="green.500" />} />
            </InputGroup>
            <Select onChange={(e) => setChoosedCurrency(e.target.value)} width="100%">
              <option value={""}>Choose an currency to buy</option>
              {exchange === "usd_to_gbp" ? <option value="GBP" label="GBP" /> : <option value="USD" label="USD" />}
            </Select>
            {userQuantity === "NaN" || userQuantity === "" || userQuantity === undefined ? (
              <></>
            ) : (
              <Text fontSize={"xl"} color={"#000000"} fontWeight={"bold"}>
                Total: ${currencyValue[0]?.value! * parseFloat(userQuantity)}
              </Text>
            )}
            <Button onClick={buyCurrency} width={"100%"} backgroundColor={"#8236FD"} color={"#ffffff"}>
              Buy
            </Button>
          </Container>
        </Container>
      </div>
    </main>
  );
};
