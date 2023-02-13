import { Route, Routes, createMemoryRouter, RouterProvider, BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import { cleanup, render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "setimmediate";
import Header from "../../components/header/Header";
import { Login } from "../../pages/login/Login";
import { Home } from "../../pages/home/Home";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();
jest.setTimeout(60000);
afterAll(cleanup);

describe("He tries to logoff", () => {
  it("should be click in the Logout button", async () => {
    const logoutEvent = { logout: "test" };
    const routes = [
      {
        path: "/home/63e5135202704aea76e5fc52",
        element: <Home />,
        loader: () => logoutEvent,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/home/63e5135202704aea76e5fc52"],
      initialIndex: 1,
    });

    act(() => {
      render(
        <AuthContextProvider>
          <BrowserRouter>
            <Header user={[]} />
            <Routes>
              <Route path="/" element={<Login submit={() => {}} />} />
            </Routes>
          </BrowserRouter>
          <RouterProvider router={router} />
        </AuthContextProvider>
      );
    });
    const logoutButton = screen.getByTestId("Logout");
    expect(logoutButton).toBeTruthy();
    fireEvent.click(logoutButton);
    await waitFor(() => screen.queryByPlaceholderText("Enter your email"));
    expect(screen.queryByPlaceholderText("Enter your email")).toBeTruthy();
  });
});
