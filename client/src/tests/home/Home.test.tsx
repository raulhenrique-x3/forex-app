import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import { Home } from "../../pages/home/Home";
import { cleanup, render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { create } from "react-test-renderer";
import axios from "../../__mocks__/axios";
import { Wallet } from "../../components/wallet/Wallet";
import CurrencyContainer from "../../components/currencyContainer/CurrencyContainer";
import "setimmediate";

jest.setTimeout(60000);
afterEach(cleanup);

describe("Access the home page", () => {
  it("should be have a wallet in home", async () => {
    create(
      <AuthContextProvider>
        <ChakraProvider>
          <MemoryRouter initialEntries={["/home/63e5135202704aea76e5fc52"]}>
            <Routes>
              <Route path={`/home/:id`} element={<Home />} />
            </Routes>
          </MemoryRouter>
        </ChakraProvider>
      </AuthContextProvider>
    );
    const wallet = screen.findByText("Wallet balance:");
    expect(wallet).toBeTruthy();
  });

  it("should to see your amount wallet fetched from api in home", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        userWallet: { usdAmount: 2000, gbpAmount: 1000, userBalance: 2000 },
        gbpUsd: { Value: 1.2095 },
        usdGbp: { Value: 0.8354 },
      },
    });

    render(
      <AuthContextProvider>
        <MemoryRouter initialEntries={["/home/63e5135202704aea76e5fc52"]}>
          <Wallet />
        </MemoryRouter>
      </AuthContextProvider>
    );

    const walletMoney = await screen.findByText("$2,000.00");
    expect(walletMoney).toBeTruthy();
  });

  it("should to see a currencyContainer with value fetched from api in home", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          Value: 0.84,
        },
      ],
    });

    render(
      <AuthContextProvider>
        <ChakraProvider>
          <MemoryRouter initialEntries={["/home/63e5135202704aea76e5fc52"]}>
            <CurrencyContainer showUSD={true} />
          </MemoryRouter>
        </ChakraProvider>
      </AuthContextProvider>
    );

    const apiValue = await screen.findByText("USD-GBP: 0.84");
    expect(apiValue).toBeTruthy();
  });
});
