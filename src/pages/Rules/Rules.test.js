import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Rules from ".";
import { ThemeProvider } from "@chakra-ui/react";

// export const ThemeWrapper = ({ children }) => (
//   <ThemeProvider>{children}</ThemeProvider>

describe("Rules", () => {
  test("it renders a div containing rules", () => {
    render(<Rules />, { ThemeProvider });
    const rules = screen.queryByRole("rules");
    expect(rules).toBeInTheDocument();
  });
  test("it renders text: '1.Join a Room to Play with Others'", () => {
    render(<Rules />, { ThemeProvider });
    const rules = screen.getByText(/Join A Room To Play With Others!/i);
    expect(rules).toBeInTheDocument();
  });
});
