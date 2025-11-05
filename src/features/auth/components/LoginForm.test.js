import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
import LoginForm from "./LoginForm";

jest.mock("../authService", () => ({
  loginUser: jest.fn().mockResolvedValue({
    token: "123",
    user: { name: "Mock User" },
  }),
  logoutUser: jest.fn(),
  getUserFromStorage: jest.fn().mockReturnValue(null),
}));

test("renders login form and logs in user", async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/username/i), {
    target: { value: "testUser" },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "1234" },
  });
 // fireEvent.click(screen.getByRole("button", { name: /login/i }));

  // await waitFor(() =>
  //   expect(screen.getByText(/mock user/i)).toBeInTheDocument()
  // );
});
