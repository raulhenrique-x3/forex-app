import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import { Login } from "../../pages/login/Login";
import { render, cleanup, act } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.setTimeout(60000);
afterEach(cleanup);

describe("User access the login page", () => {
  it("should have inputs of email & password & a button to login", async () => {
    await act(async () => {
      render(
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login submit={() => {}} />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      );
    });
    const email = screen.queryByPlaceholderText("Enter your email");
    const password = screen.queryByPlaceholderText("Enter your password");
    const button = screen.getByTestId("loginButton");

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should allow the user to submit heir credentials", () => {
    const login = jest.fn();
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login submit={login} />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    );
    const email = screen.getByPlaceholderText("Enter your email");
    const password = screen.getByPlaceholderText("Enter your password");
    const button = screen.getByTestId("loginButton");

    userEvent.type(email, "raul@email.com");
    userEvent.type(password, "123456789");
    userEvent.click(button);

    expect(login).toHaveBeenCalledWith({ userEmail: "raul@email.com", userPassword: "123456789" });
  });
});
