/**
 * @jest-environment jsdom
 */

import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from ".";
import { ThemeProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

// export const ThemeWrapper = ({ children }) => (
//   <ThemeProvider>{children}</ThemeProvider>

describe("Footer", () => {
  test("it renders a footer tag", () => {
    render(<Footer />, { ThemeProvider });
    const footer = screen.queryByRole("footer");
    expect(footer).toBeInTheDocument();
  });
});
