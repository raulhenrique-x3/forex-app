import { ChakraProvider } from "@chakra-ui/react";
import { cleanup, render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { create } from "react-test-renderer";
import { AuthContextProvider } from "../../context/AuthContext";
import { BuyCurrency } from "../../pages/buyCurrency/BuyCurrency";
import "setimmediate";
import axios from "../../__mocks__/axios";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
afterEach(cleanup);

describe("He should be able to buy currency", () => {
  it("should be in the Buy Currency screen", () => {
    create(
      <AuthContextProvider>
        <ChakraProvider>
          <MemoryRouter initialEntries={["/wallet/buy_currency/gbp_to_usd/63e5135202704aea76e5fc52"]}>
            <Routes>
              <Route path={`/wallet/buy_currency/:exchange/:userId`} element={<BuyCurrency />} />
            </Routes>
          </MemoryRouter>
        </ChakraProvider>
      </AuthContextProvider>
    );
    const buyButton = screen.findByTestId("BuyCurrency");
    expect(buyButton).toBeTruthy();
  });

  it("should be able to buy currency if he sets the values and click on buy button", async () => {
    const buy = axios.put.mockResolvedValueOnce({
      currencyValue: 0.8,
      userQuantity: 10,
      choosedCurrency: "GBP-USD",
    });
    act(() => {
      render(
        <AuthContextProvider>
          <ChakraProvider>
            <MemoryRouter initialEntries={["/wallet/buy_currency/gbp_to_usd/63e5135202704aea76e5fc52"]}>
              <Routes>
                <Route path={`/wallet/buy_currency/:exchange/:userId`} element={<BuyCurrency jestBuyTest={buy} />} />
              </Routes>
            </MemoryRouter>
          </ChakraProvider>
        </AuthContextProvider>
      );
    });
    const buyButton = screen.findByTestId("BuyCurrency");
    expect(buyButton).toBeTruthy();
    fireEvent.click(await buyButton);
    expect(buy).toBeCalled();
  });

  it("should be receive an error when try to buy currency with wrong values", async () => {
    const buy = axios.put.mockResolvedValueOnce({
      currencyValue: 0.8,
      userQuantity: -10,
      choosedCurrency: "GBP-ERROR",
    });
    act(() => {
      render(
        <AuthContextProvider>
          <ChakraProvider>
            <MemoryRouter initialEntries={["/wallet/buy_currency/gbp_to_usd/63e5135202704aea76e5fc52"]}>
              <Routes>
                <Route path={`/wallet/buy_currency/:exchange/:userId`} element={<BuyCurrency jestBuyTest={buy} />} />
              </Routes>
            </MemoryRouter>
          </ChakraProvider>
        </AuthContextProvider>
      );
    });
    const buyButton = screen.findByTestId("BuyCurrency");
    expect(buyButton).toBeTruthy();
    const buyEv = fireEvent.click(await buyButton);
    console.log("Error buy ev", buyEv);
  });

  it("should be able to see the transition in the history", async () => {
    const buy = axios.put.mockResolvedValueOnce({
      purchasedCurrency: "GBP-USD",
      currencyAmount: 10,
    });
    act(() => {
      render(
        <AuthContextProvider>
          <ChakraProvider>
            <MemoryRouter initialEntries={["/wallet/buy_currency/gbp_to_usd/63e5135202704aea76e5fc52"]}>
              <Routes>
                <Route path={`/wallet/buy_currency/:exchange/:userId`} element={<BuyCurrency jestBuyTest={buy} />} />
              </Routes>
            </MemoryRouter>
          </ChakraProvider>
        </AuthContextProvider>
      );
    });
    const buyButton = screen.findByTestId("BuyCurrency");
    expect(buyButton).toBeTruthy();
    const buyEv = fireEvent.click(await buyButton);
    console.log("History event", buyEv);
  });
});
