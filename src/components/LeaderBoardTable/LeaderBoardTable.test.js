/**
 * @jest-environment jsdom
 */


import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LeaderBoardTable from ".";
import { ThemeProvider } from "@chakra-ui/react";


describe("LeaderBoard Table", () => {
  test("it contains leaderboard table inside component", () => {
    render(<LeaderBoardTable />, { ThemeProvider });
    const table = screen.queryByRole("table");
    expect(table).toBeInTheDocument();
  });

});
