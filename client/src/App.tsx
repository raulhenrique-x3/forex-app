import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Login } from "./pages/login/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Register } from "./pages/register/Register";
import { Home } from "./pages/home/Home";
import { WalletScreen } from "./pages/walletScreen/WalletScreen";
import { Unauthorized } from "./pages/unauthorized/Unauthorized";
import { NotFound } from "./pages/notFound/NotFound";
import { AuthContextProvider } from "./context/AuthContext";
import { AuthRoute } from "./components/authRoute/AuthRoute";
import { BuyCurrency } from "./pages/buyCurrency/BuyCurrency";
import { HistoryPage } from "./pages/historyPage/HistoryPage";

function App() {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login submit={() => {}} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route element={<AuthRoute />}>
              <Route path="/home/:userId" element={<Home />} />
              <Route path="/wallet/:userId" element={<WalletScreen />} />
              <Route path="/wallet/buy_currency/:exchange/:userId" element={<BuyCurrency />} />
              <Route path="/history/:userId" element={<HistoryPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default App;
