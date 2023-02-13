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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IBuyCurrency {
  map?: any;
  source?: string;
  target?: string;
  Value?: number;
  time?: number;
  jestBuyTest?: object;
  jestHistoryTest?: object;
}

export const BuyCurrency: React.FC<IBuyCurrency> = ({ jestBuyTest, jestHistoryTest }) => {
  const [apiData, setApiData] = useState<IBuyCurrency[]>([]);
  const [userData, setUserData] = useState<IUser[]>([]);
  const [currencyValue, setCurrencyValue] = useState<IBuyCurrency[]>([]);
  const [userQuantity, setUserQuantity] = useState<string>();
  const [choosedCurrency, setChoosedCurrency] = useState<string>();

  const toast = useToast();
  let { userId } = useParams();
  const { exchange } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/home/${userId}`)
      .then((res) => {
        setUserData([res.data]);
      })
      .catch((error) => {
        console.error("Error in BuyCurrency", error);
      });
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/history/${exchange}`)
      .then((res) => {
        setApiData(res.data);
      })
      .catch((err) => console.error(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${exchange}`)
      .then((res) => {
        setCurrencyValue(res.data);
      })
      .catch((err) => console.error(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let numbers: number[] = [];

  for (let i = 0; i < 169; i++) {
    numbers.push(i);
  }

  const data = {
    labels: numbers,
    datasets: [
      {
        label: "Currency value variation chart",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: apiData[0]?.map((i: any) => i.value),
      },
    ],
  };

  const buyCurrency = async () => {
    try {
      const { data } = await axios.put(`http://localhost:5000/exchange/${userId}`, {
        currencyValue: currencyValue[0]?.Value,
        userQuantity: parseFloat(userQuantity!),
        choosedCurrency: choosedCurrency,
      });
      await axios.put(`http://localhost:5000/history/${userId}`, {
        purchasedCurrency: choosedCurrency,
        currencyAmount: parseFloat(userQuantity!),
      });

      toast({
        title: data,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Insert a correct amount",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <main className={styles.buyCurrencyMain}>
      <Header user={userData} />
      <div className={styles.desktopCurrencyWallet}>
        <div className={styles.graphic}>
          <div className={styles.graphicCurrency}>
            <Line width={"100%"} height={"100%"} data={data} />
          </div>
        </div>

        <Container display={"flex"} flexDirection={"column"} gap={4}>
          <Container>
            <Wallet />
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
              {exchange === "usd_to_gbp" ? (
                <option value="GBP-USD" label="GBP" />
              ) : (
                <option value="USD-GBP" label="USD" />
              )}
            </Select>
            {isNaN(parseFloat(userQuantity!)) || parseFloat(userQuantity!) < 0 ? (
              <></>
            ) : (
              <Text fontSize={"xl"} color={"#000000"} fontWeight={"bold"}>
                Total: ${currencyValue[0]?.Value! * parseFloat(userQuantity!)}
              </Text>
            )}

            <Button
              data-testid="BuyCurrency"
              onClick={buyCurrency}
              width={"100%"}
              backgroundColor={"#8236FD"}
              color={"#ffffff"}
            >
              Buy
            </Button>
          </Container>
        </Container>
      </div>
    </main>
  );
};
